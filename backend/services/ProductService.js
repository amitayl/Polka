const DBService = require('./DBService');
const mongo = require('mongodb');
const UserService = require('./UserService.js');
function pcl(obj) {
  var e = JSON.stringify(obj, null, 2)
  console.log(e)
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
  // console.log ('product' , product);
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

function getById(productId) {
  let product_id = new mongo.ObjectID(productId);
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection(DBService.COLLECTIONS.PRODUCT)
        .findOne({ _id: product_id }, (err, product) => {
          if (err) reject(err);
          else {
            resolve(product);
          }
        });
    });
  });
}

let returnObj = {};


function getOffersByProductIds(ids) {
  var prms = ids.map(getOffersByProdId)
  return Promise.all(prms)
}


function getOffersByProductId(id) {
  id =  new mongo.ObjectID(id)
  return new Promise((resolve, reject) => {
    DBService.dbConnect()
      .then(db => {
        console.log('yalla');
        db.collection(DBService.COLLECTIONS.PRODUCT)
          .findOne({ _id: id })
          .then(product => returnObj.prod = product)
          .then(_ => {
            db.collection(DBService.COLLECTIONS.BID)
              .find({ owner: { productId: id } })
              .toArray()
              .then(bids => {
                var bidsId = bids.map(bid => bid._id)
                var ids = bids.map(bid =>  new mongo.ObjectID(bid.bidder.productId))

                db.collection(DBService.COLLECTIONS.BID)
                .aggregate(
                  [ 
                    { $match : { _id: { $in: bidsId } } },   
                    { $lookup:
                      {
                        from: 'product',
                        foreignField: '_id',
                        localField: 'bidder.productId',
                        as: 'elad'
                      }
                    }
                  ]
                  )
                  .toArray((err , res ) => {
                    (res => {
                      returnObj.bidProds = bidProds;
                    }).then(x => {
                        console.log ('returnObj' , returnObj);
                        resolve(returnObj)}) 

                  })
              
                  // .find({ _id: { $in: ids } })
                  // .toArray()
                  // .then(bidProds => bidProds.map(bidProd, idx))
                  // .then(bidProds => returnObj.bidProds = bidProds)
                  // .then(x => {
                  //   console.log ('returnObj' , returnObj);
                  //   resolve(returnObj)})
              })
          })
      })
  })
}


// function getOffersByProductIds(ids) {
//   var prms = ids.map(getOffersByProductId)
//   console.log ('yalla2');
//   return Promise.all(prms)
// }


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
