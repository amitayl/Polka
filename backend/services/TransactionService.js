const DBService = require('./DBService');
const mongo = require('mongodb');


function getById(transactionId) {
    userId = new mongo.ObjectID(transactionId);
    
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
  