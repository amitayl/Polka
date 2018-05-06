const DBService = require('./DBService');
const mongo = require('mongodb');

class User {
  constructor({ email, password, img, desc, location, nickName }) {
    this.createdAt = Date.now();
    this.productIds = [];

    this.email = email;
    this.password = password;
    this.img = img;
    this.desc = desc;
    this.location = location;
    this.nickName = nickName;
  }
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
            db.close();
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

function getById(userId) {
  console.log ('zzzzzzzzzz' , userId);
  let user_Id = new mongo.ObjectID(userId);
  
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection(DBService.COLLECTIONS.USER)
        .findOne({ _id: user_Id }, (err, user) => {
          console.log ('user' , user);
          if (err) reject(err);
          else {
            resolve(user);
          }
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
  add,
  getById,
  checkLogin
};
