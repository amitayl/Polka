const DBService = require('./DBService.js');
const mongo = require('mongodb');
const User = require('../classes/UserClass.js');

function query() {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection(DBService.COLLECTIONS.USER)
        .find()
        .toArray((err, user) => {
          if (err) reject(err);
          else {
            resolve(user);
          }
          db.close();
        });
    });
  });
}

function add(userData) {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {

      _validateDetails(userData, db).then(isValidObj => {
        if (!isValidObj.valid) reject(isValidObj.txt)
        else {
          db
            .collection(DBService.COLLECTIONS.USER)
            .findOne({ email: userData.email }, (err, userFromDB) => {
              // If name is already used!
              if (userFromDB) {
                reject('Name is already used!');
              } else {
                const newUser = new User(userData);

                db
                  .collection(DBService.COLLECTIONS.USER)
                  .insertOne(newUser, (err, res) => {
                    if (err) reject(err);
                    else {
                      resolve(res.ops[0]);
                    }
                    db.close();
                  });
              }
            });
        }
      });
    });
  });

  function _validateDetails(userData, db) {
    return new Promise((resolve, reject) => {
      const isValidObj = { valid: true, txt: null };

      db
        .collection(DBService.COLLECTIONS.USER)
        .findOne({ email: userData.email }, (err, user) => {
          if (err) reject();
          else if (user) {
            isValidObj.valid = false;
            isValidObj.txt = 'this email already exists';
            resolve(isValidObj);
          } else {
            db
              .collection(DBService.COLLECTIONS.USER)
              .findOne({ nickName: userData.nickName }, (err, user) => {
                if (err) reject();
                else if (user) {
                  isValidObj.valid = false;
                  isValidObj.txt = 'this nick name already exists';
                  resolve(isValidObj);
                } else {
                  resolve(isValidObj);
                }
              });
          }
        });
    });
  }
}

function remove(userId) {
  // got through all his products and set isLive = false;
  userId = new mongo.ObjectID(userId);
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection(DBService.COLLECTIONS.USER)
        .deleteOne({ _id: userId }, (err, removedUser) => {
          if (err) reject(err);
          else resolve(removedUser);
          db.close();
        });
    });
  });
}

function getById(userId, colsToGet) {
  userId = new mongo.ObjectID(userId);

  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection(DBService.COLLECTIONS.USER)
        .findOne({ _id: userId }, colsToGet, (err, user) => {
          if (err) reject(err);
          else resolve(user);

          db.close();
        });
    });
  });
}

function checkLogin(loginData) {
  loginData = JSON.parse(loginData);
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection(DBService.COLLECTIONS.USER)
        .findOne(
          { email: loginData.email, password: loginData.password },
          (err, user) => {
            if (err) reject(err);
            else resolve(user);
            db.close();
          }
        );
    });
  });
}

function addReview(review) {
  return new Promise((resolve, reject) => {
    const userId = new mongo.ObjectID(review.getterId);
    const senderId = new mongo.ObjectID(review.details.senderId);
    DBService.dbConnect().then(db => {
      db
        .collection(DBService.COLLECTIONS.USER)
        .findOne({ _id: senderId })
        .then(sender => {
          review.details.senderImg = sender.img;
          db.collection(DBService.COLLECTIONS.USER).updateOne(
            { _id: userId },
            {
              $push: {
                reviews: review.details
              }
            },
            (err, res) => {
              if (err) {
                reject(err);
              } else resolve();
              db.close();
            }
          );
        });
    });
  });
}

function linkProductToOwner(ownerId, productId) {
  return new Promise((resolve, reject) => {
    ownerId = new mongo.ObjectID(ownerId);
    productId = new mongo.ObjectID(productId);

    DBService.dbConnect().then(db => {
      db
        .collection(DBService.COLLECTIONS.USER)
        .updateOne(
          { _id: ownerId },
          { $push: { productIds: productId } },
          (err, res) => {
            if (err) reject(err);
            else resolve(res);
          }
        );
    });
  });
}

function update(userData) {
  return new Promise((resolve, reject) => {
    userId = new mongo.ObjectID(userData._id);

    DBService.dbConnect().then(db => {
      db
        .collection(DBService.COLLECTIONS.USER)
        .updateOne(
          { _id: userId },
          { $set: { desc: userData.desc } },
          (err, res) => {
            if (err) reject(err);
            else resolve(res);
          }
        );
    });
  });
}

module.exports = {
  query,
  getById,
  add,
  remove,
  checkLogin,
  linkProductToOwner,
  addReview,
  update
};
