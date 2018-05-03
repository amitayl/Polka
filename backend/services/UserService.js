const DBService = require('./DBService');
const mongo = require('mongodb');

function addUser(user) {
  return new Promise((resolve, reject) => {
    let isValidate = validateDetails(user);
    if (!isValidate) reject('Validate failed!');
    DBService.dbConnect().then(db => {
      db
        .collection(DBService.COLLECTIONS.USER)
        .findOne({ name: user.name }, (err, userFromDB) => {
          // If name is already used!
          if (userFromDB) {
            reject('Name is already used!');
            db.close();
          } else {
            db
              .collection(DBService.COLLECTIONS.USER)
              .insert(user, (err, res) => {
                if (err) reject(err);
                else resolve(res.ops);
                db.close();
              });
          }
        });
    });
  });

  function validateDetails(user) {
    return true;
    //   return user.name !== 'puki';
  }
}

function getUserById (userId){

let user_Id = new mongo.ObjectID(userId);
  return new Promise((resolve, reject) => {
    DBService.dbConnect()
      .then(db => {
        db.collection(DBService.COLLECTIONS.USER).findOne({ _id: user_Id }, function (err, user) {
          if (err) reject(err)
          else {
            // console.log('user' , user);
            resolve(user);
          }
          db.close();
        });
      })
  });
}




// function checkLogin(user) {
//     const userCredentials = { name: user.name, password: user.password };
//   }

module.exports = {
  addUser,
  getUserById
//   checkLogin
};
