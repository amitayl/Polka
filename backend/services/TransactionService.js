const DBService = require('./DBService');
const mongo = require('mongodb');

function query() {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection(DBService.COLLECTIONS.TRANSACTION)
        .find({}).toArray((err, transactions) => {
          if (err) reject(err);
          else resolve(transactions);
          db.close();
        });
    });
  });
}

function getById(transactionId) {
  console.log('get to backend');
  let gogo = new mongo.ObjectID('5af9b461455f27166c38ad64');
  let transaction_id = new mongo.ObjectID(transactionId);
  let transactionObj = {};
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection(DBService.COLLECTIONS.TRANSACTION)
        .findOne({ _id: transaction_id }, (err, transaction) => {
          if (err) reject(err);
          else {
            console.log('transaction_id', transaction_id, 'transactionId', transactionId)
            console.log('trans', transaction)
            db
              .collection(DBService.COLLECTIONS.PRODUCT)
              .findOne({ _id: gogo }, (err, product) => {
                if (err) reject(err)
                console.log ('zuzu' , transaction.owner.productId);
                console.log('product', product)
                transactionObj.owner = {};
              //  transactionObj.owner.prodImg = product.imgs[0];
                transactionObj.owner.prodTitle = product.title;
                db.collection(DBService.COLLECTIONS.USER)
                  .findOne({ _id: transaction.owner._id }, (err, user) => {
                    transactionObj.owner.img = user.imgs
                    transactionObj.owner.nickName = user.nickName

                    // db
                    //   .collection(DBService.COLLECTIONS.PRODUCT)
                    //   .findOne({ _id: transaction.bidder.productId }, (err, product) => {
                    //     if (err) reject(err);
                    //     console.log('product', product)
                    //     transactionObj.bidder = {};
                    //   //  transactionObj.bidder.prodImg = product.imgs[0];
                    //     transactionObj.bidder.prodTitle = product.title;
                    //     db.collection(DBService.COLLECTIONS.USER)
                    //       .findOne({ _id: transaction.bidder._id }, (err, user) => {
                    //         transactionObj.bidder.img = user.imgs
                    //         transactionObj.bidder.nickName = user.nickName
                    //         console.log('transObj', transactionObj)
                            resolve(transactionObj)
                    //       })

                    //   });
                  })
              })
          }
        });
        db.close();
    });
  })
}

function add(bid, isDeal) {
  console.log('add')
  // transactionId = new mongo.ObjectID(transactionId);
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
            console.log('transinsert')
            resolve();
          }
        })
      //     const bidderId = new mongo.ObjectID(bid.bidder.product.ownerId);

      //     pushNotification(bidderId, insertedId, db)
      //       .then(() => resolve())
      //       .catch(() => reject());
      //     resolve();
      //   }
      // });
    });
  });
}

module.exports = {
  query,
  getById,
  add
}