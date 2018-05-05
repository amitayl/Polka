const DBService = require('./DBService');
const mongo = require('mongodb');
const UserService = require ('./UserService.js')


function query(criteria = {}) {
  return new Promise((resolve, reject) => {
    return DBService.dbConnect().then(db => {
      db
        .collection(DBService.COLLECTIONS.PRODUCT)
        .find(criteria)
        .toArray((err, products) => {
          if (err) reject(err)
          else resolve(products);
        });
    });
  });
}

function add(product) {
  return new Promise((resolve, reject) => {
    return DBService.dbConnect().then(db => {
      db.collection(DBService.COLLECTIONS.PRODUCT).insert(product, (err, res) => {
        if (err) reject(err)
        else resolve(res.ops);
      });
    });
  });
}


function getProductById(productId) {
  productId = new mongo.ObjectID(productId);
  return new Promise((resolve, reject) => {
    
    DBService.dbConnect()
      .then(db => {
        db.collection(DBService.COLLECTIONS.PRODUCT).findOne({ _id: productId }, function (err, product) {
          if (err) reject(err)
          else {
            resolve(product);
          }
          db.close();
        });
      })
  });
}

function getById(productId){
  return new Promise((resolve, reject) => {
    getProductById(productId)
    .then(product => {

      UserService.getById(product.ownerId).then(user => {
        // product.userImg = user.img;
        // product.userName = user.name 
        resolve({product , owner:user})

      })
    })
  })
}
// }

// getProductWithOwnwe.then(x => console.log(x)) print {product ,owner : user}

// function getTowThings (){
//   var prm1 = 
//   return Promise.all([prm1,prm2])
// }

module.exports = {
  query,
  add,
  getById
};