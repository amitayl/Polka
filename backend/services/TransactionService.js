const DBService = require('./DBService');
const mongo = require('mongodb');

function query() {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection(DBService.COLLECTIONS.TRANSACTION)
        .find({})
        .toArray((err, transactions) => {
          if (err) reject(err);
          else resolve(transactions);
          db.close();
        });
    });
  });
}

function getById(transactionId) {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection(DBService.COLLECTIONS.TRANSACTION)
        .findOne({
          _id: new mongo.ObjectID(transactionId)
        })
        .then(transaction => {
          let owner = {};
          let bidder = {};

          let prmOwner = new Promise((resolve, reject) => {
            db
              .collection(DBService.COLLECTIONS.PRODUCT)
              .findOne({
                _id: new mongo.ObjectId(transaction.owner.productId)
              })
              .then(product => {
                owner.prodTitle = product.title;
                owner.prodImg = product.imgs[0];
                owner.prodDesc = product.desc;
                
                db
                  .collection(DBService.COLLECTIONS.USER)
                  .findOne({
                    _id: new mongo.ObjectId(transaction.owner._id)
                  })
                  .then(user => {
                    owner._id = user._id;
                    owner.img = user.img;
                    owner.nickName = user.nickName;
                    owner.loc = user.loc
                    owner.email = user.email;
                    resolve(owner);
                  });
              });
          });

          let prmBidder = new Promise((resolve, reject) => {
            db
              .collection(DBService.COLLECTIONS.PRODUCT)
              .findOne({
                _id: new mongo.ObjectId(transaction.bidder.productId)
              })
              .then(product => {
                bidder.prodTitle = product.title;
                bidder.prodImg = product.imgs[0];
                bidder.prodDesc = product.desc;
                db
                  .collection(DBService.COLLECTIONS.USER)
                  .findOne({
                    _id: new mongo.ObjectId(transaction.bidder._id)
                  })
                  .then(user => {
                    bidder._id = user._id;
                    bidder.img = user.img;
                    bidder.nickName = user.nickName;
                    bidder.email = user.email;
                    resolve(bidder);
                  });
              });
          });
          Promise.all([prmOwner, prmBidder]).then(values => {
            let transObj = {
              createdAt: transaction.createdAt
            };
            transObj.owner = values[0];
            transObj.bidder = values[1];
            resolve(transObj);
          });
        });
    });
  });
}

function add(bid, isDeal) {
  let transaction = bid;
  transaction.isDeal = isDeal;
  transaction.createdAt = Date.now();

  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection(DBService.COLLECTIONS.TRANSACTION)
        .insertOne(transaction, (err, result) => {
          if (err) reject('err', err);
          else {
            resolve();
          }
        });
    });
  });
}

function getDealsByUserId(userId) {
  return new Promise((resolve, reject) => {
    userId = new mongo.ObjectID(userId);

    const filter = {
      $and: [
        {
          $or: [{ 'owner._id': userId }, { 'bidder._id': userId }]
        },
        { isDeal: true }
      ]
    };

    DBService.dbConnect().then(db => {
      db
        .collection(DBService.COLLECTIONS.TRANSACTION)
        .find(filter)
        .toArray((err, transactions) => {
          if (err) reject(err);
          else if (transactions.length > 0) {
            _replaceProductIdsWithData(transactions, db).then(
              detailedTransactions => {
                resolve(detailedTransactions);
              }
            );
          } else resolve();
          db.close();
        });
    });
  });
}

function _replaceProductIdsWithData(transactions, db) {
  return new Promise((resolve, reject) => {
    const filter = {
      $or: []
    };

    transactions.forEach(transaction => {
      const ownerProductId = {
        _id: new mongo.ObjectID(transaction.owner.productId)
      };
      const bidderProductId = {
        _id: new mongo.ObjectID(transaction.bidder.productId)
      };
      filter.$or.push(ownerProductId, bidderProductId);
    });

    const colsToGet = { _id: 1, title: 1, imgs: 1 };

    db
      .collection(DBService.COLLECTIONS.PRODUCT)
      .find(filter, colsToGet)
      .toArray((err, products) => {
        if (err) reject(err);
        else {
          transactions.forEach(transaction => {
            const ownerProduct = products.find(product => {
              return (
                product._id.toString() ===
                transaction.owner.productId.toString()
              );
            });
            delete transaction.owner.productId;
            transaction.owner.product = ownerProduct;

            const bidderProduct = products.find(product => {
              return (
                product._id.toString() ===
                transaction.bidder.productId.toString()
              );
            });
            delete transaction.bidder.productId;
            transaction.bidder.product = bidderProduct;
          });

          resolve(transactions);
        }
      });
  });
}

module.exports = {
  query,
  getById,
  add,
  getDealsByUserId
};
