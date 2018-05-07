const DBService = require('./DBService');
const mongo = require('mongodb');

class User {
  constructor({ email, password, img, desc, location, nickName }) {
    this.createdAt = Date.now();
    this.productIds = [];
    this.notifications = [];

    this.email = email;
    this.password = password;
    this.img = img;
    this.desc = desc;
    this.location = location;
    this.nickName = nickName;
  }
}

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

function getById(userId) {
  const user_Id = new mongo.ObjectID(userId);
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection(DBService.COLLECTIONS.USER)
        .findOne({ _id: user_Id }, (err, user) => {
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
    //   return user.name !== 'puki';
  }
}

function remove(userId) {
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

module.exports = {
  query,
  getById,
  add,
  remove,
  checkLogin
};
