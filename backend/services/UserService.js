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
    // let isValidate = _validateDetails(user);
    // if (!isValidate) reject('Validate failed!');
    DBService.dbConnect().then(db => {
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
                  console.log(res.ops[0]);
                  resolve(res.ops[0]);
                }
                db.close();
              });
          }
        });
    });
  });

  function _validateDetails(user) {
    return true;
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
            if (err) reject(err)
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
  linkProductToOwner
};
