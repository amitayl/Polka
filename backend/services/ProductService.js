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
    DBService.dbConnect().then(db => {
      db
        .collection(DBService.COLLECTIONS.PRODUCT)
        .insertOne(product, (err, res) => {
          if (err) reject(err);
          else {
            const addedProduct = res.ops[0];
            const addedProductOwnerId = new mongo.ObjectID(
              addedProduct.ownerId
            );
            const addedProductId = new mongo.ObjectID(addedProduct._id);

            db
              .collection(DBService.COLLECTIONS.USER)
              .updateOne(
                { _id: addedProductOwnerId },
                { $push: { productIds: addedProductId } },
                (err, res) => {
                  if (err) reject(err);
                  else resolve(res);
                }
              );
          }
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

function getById(productId, colsToGet) {
  let product_id = new mongo.ObjectID(productId);
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection(DBService.COLLECTIONS.PRODUCT)
        .findOne({ _id: product_id }, colsToGet, (err, product) => {
          if (err) reject(err);
          else {
            resolve(product);
          }
        });
    });
  });
}

function getOffersByProductId(productId) {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection(DBService.COLLECTIONS.BID)
        .findOne({ bidder: { product_id: productId } }, function(err, offers) {
          if (err) reject(err);
          else {
            resolve(offers);
          }
          db.close();
        });
    });
  });
}

function getByIds(productIds) {
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
        .find(mongoQuery, colsToGet)
        .toArray((err, products) => {
          // console.log(products);
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
  getOffersByProductId
};
