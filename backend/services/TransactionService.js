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
  transactionId = new mongo.ObjectID(transactionId);

  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection(DBService.COLLECTIONS.TRANSACTION)
        .findOne({ _id: transactionId }, (err, transaction) => {
          if (err) reject(err);
          else resolve(transaction);
          db.close();
        });
    });
  });
}

module.exports =  {
  query,
  getById
}