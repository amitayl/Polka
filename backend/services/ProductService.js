const DBService = require('./DBService');
const mongo = require('mongodb');
const UserService = require('./UserService.js');

function query(criteria = {}) {
  return new Promise((resolve, reject) => {
    return DBService.dbConnect().then(db => {
      db
        .collection(DBService.COLLECTIONS.PRODUCT)
        .find(criteria)
        .toArray((err, products) => {
          if (err) reject(err);
          else resolve(products);
        });
    });
  });
}

function add(product) {
  return new Promise((resolve, reject) => {
    return DBService.dbConnect().then(db => {
      db
        .collection(DBService.COLLECTIONS.PRODUCT)
        .insert(product, (err, res) => {
          if (err) reject(err);
          else resolve(res.ops);
        });
    });
  });
}


function getProductDetailsById(productId) {
  productId = new mongo.ObjectID(productId);
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection(DBService.COLLECTIONS.PRODUCT)
        .findOne({ _id: productId }, (err, product) => {
          if (err) reject(err);
          else {
            UserService.getById(product.ownerId)
              .then(user => {
                resolve({ product, owner: user });
              })
              .catch(err => reject(err));
          }
          db.close();
        });
      });
  });
}

function getById(productId){
  let product_id = new mongo.ObjectID(productId);
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection(DBService.COLLECTIONS.PRODUCT)
        .findOne({ _id: product_id }, (err, product) => {
          if (err) reject(err)
          else {
                resolve(product );
          }
              
        })
      })
    })
}

function getOffersByProductId(productId) {
  let product_Id = productId;
  return new Promise((resolve, reject) => {
    DBService.dbConnect()
      .then(db => {
        db.collection(DBService.COLLECTIONS.BID).findOne(
          { bidder: { product_id: '5ae9bc40c66def0488aff9ec' } },
          function (err, offers) {
            if (err) {
              console.log('err', err);
            }
            else {
              console.log('offers', offers)
              resolve(offers);
            }
            db.close();
          });
      })
  })
}



function getProductById(productId) {
  return new Promise((resolve, reject) => {
    getProductById(productId)
      .then(product => {
        console.log('product', product);
        console.log('product.ownerId', product.ownerId)

        UserService.getById(product.ownerId).then(user => {
          console.log('user', user);
          // product.userImg = user.img;
          // product.userName = user.name 
          resolve({ product, owner: user })

        })
      })
  })
}
// }
function getByIds(productIds) {
  console.log(productIds);

  const mongoQuery = { $or: [] };
  mongoQuery.$or = productIds.map(productId => {
    productId = new mongo.ObjectID(productId);
    return { _id: productId };
  });

  const colsToGet = {
    _id: 1,
    title: 1,
    imgs: { $slice: -1 }
  };

  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection(DBService.COLLECTIONS.PRODUCT)
        .find(mongoQuery, colsToGet).toArray((err, products) => {
          console.log(products);
          if (err) reject(err);
          else resolve(products);
          db.close();
        });
    });
  });
}

module.exports = {
  query,
  add,
  getById,
  getByIds,
  getProductDetailsById,
};
