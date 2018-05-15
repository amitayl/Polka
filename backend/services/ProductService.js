const DBService = require('./DBService');
const mongo = require('mongodb');
const UserService = require('./UserService.js');
const Product = require('../classes/ProductClass.js');

function pcl(obj) {
  var e = JSON.stringify(obj, null, 2);
  console.log(e);
}

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
    console.log(product);
    product = new Product(product);
    console.log(product);

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

function getOffersByProductId(id) {
  let returnObj = {};
  id = new mongo.ObjectID(id);
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db.collection(DBService.COLLECTIONS.PRODUCT)
        .findOne({ _id: id })
        .then(prod => {
          returnObj.prod = prod
        })
        .then(_ => {
          db
            .collection(DBService.COLLECTIONS.PRODUCT)
            .aggregate([
              { $match: { _id: id } },
              { $project: { _id: 0, bidIds: 1 } },
              { $unwind: '$bidIds' },
              {
                $lookup:
                  {
                    from: DBService.COLLECTIONS.BID,
                    localField: "bidIds",
                    foreignField: "_id",
                    as: "bidsObjects"
                  }
              },
              { $unwind: "$bidsObjects" },
              {
                $group: {
                  _id: "$_id",
                  bidIds: { "$push": "$bidIds" },
                  bidsObjects: { "$push": "$bidsObjects" },
                }
              }
            ])
            .toArray()
            .then( x => x[0])
            .then(productWithBids => {
             if (productWithBids){
              var prms = productWithBids.bidsObjects
                .map(bid => {
                  return db.collection(DBService.COLLECTIONS.PRODUCT)
                    .findOne({
                      _id: new mongo.ObjectId(bid.bidder.productId)
                    })
                    .then(bidderProd => {
                      return db.collection(DBService.COLLECTIONS.USER)
                      .findOne({
                        _id: new mongo.ObjectId(bidderProd.ownerId)
                      }).then (bidder =>{
                        return {
                          bidderName: bidder.nickName,
                          bidderImg: bidder.img,
                          bidId: bid._id,
                          bidderProdId: bid.bidder.productId, 
                          bidderProd,
                          ownerProdId: bid.owner.productId,
                        }
                      })

                    })
                }
                )
              return Promise.all(prms)
              }
              else {console.log ('lo mazliah') }
            })
            .then( x => {
              pcl(x);
              returnObj.bids = x
              resolve(returnObj)
            })
        })

    })
  })
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
