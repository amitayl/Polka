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
  // transactionId = new mongo.ObjectID(transactionId);
  let transactionObj = {};
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection(DBService.COLLECTIONS.TRANSACTION)
        .findOne({
          _id: new mongo.ObjectID(transactionId)
        })
        .then(transaction => {
          let owner = {}
          let bidder = {}

          let prmOwner = new Promise((resolve, reject) => { 
            db.collection(DBService.COLLECTIONS.PRODUCT)
            .findOne({
              _id: new mongo.ObjectId(transaction.owner.productId)
            }).then(product => {
              console.log('prod', product)
              owner.prodTitle = product.title;
              owner.prodImg = product.imgs[0];
              db.collection(DBService.COLLECTIONS.USER)
                .findOne({
                  _id: new mongo.ObjectId(transaction.owner._id)
                }).then(user => {
                  owner._id = user._id
                  owner.img = user.img
                  owner.nickName = user.nickName
                  resolve(owner);
                  console.log('trans', transaction)
                })
              })
            })

              let prmBidder =  new Promise((resolve, reject) => {
              db.collection(DBService.COLLECTIONS.PRODUCT)
            .findOne({
              _id: new mongo.ObjectId(transaction.bidder.productId)
            }).then(product => {
              console.log('prod', product)
              bidder.prodTitle = product.title;
              bidder.prodImg = product.imgs[0];
              db.collection(DBService.COLLECTIONS.USER)
                .findOne({
                  _id: new mongo.ObjectId(transaction.bidder._id)
                }).then(user => {
                  bidder._id = user._id
                  bidder.img = user.img
                  bidder.nickName = user.nickName
                  resolve(bidder);
                  console.log('trans', transaction)
                })

              })
            })
           Promise.all([prmOwner,prmBidder]).then (transarray =>{
             let transObj = {};
             transObj.owner = transarray[0];
             transObj.bidder = transarray[1];
             resolve (transObj)
           })
              
                
            })
        })
    })
  // })
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