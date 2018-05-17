const DB_URL = 'mongodb://polka:polka@ds263109.mlab.com:63109/polka_db';
const mongo = require('mongodb');
const User = require('../classes/UserClass.js');
const Product = require('../classes/ProductClass.js');

const COLLECTIONS = {
  POLKA: 'polka',
  USER: 'user',
  PRODUCT: 'product',
  BID: 'bid',
  TRANSACTION: 'transaction',
  NOTIFICATION: 'notification'
};
Object.freeze(COLLECTIONS);

function dbConnect() {
  let prmConnect = new Promise((resolve, reject) => {
    mongo.MongoClient.connect(DB_URL, (err, db) => {
      if (err) reject(err);
      else resolve(db);
    });
  });
  prmConnect.catch(err => console.error(err));
  return prmConnect;
}

/* function cleanDB() {
  dbConnect().then(db => {
    db
      .collection(COLLECTIONS.USER)
      .update({}, { $set: { notifications: [], reviews: [] } });
    db
      .collection(COLLECTIONS.PRODUCT)
      .update({}, { $set: { isLive: true, bidIds: [], viewCount: 0 } }, err);

      // for each product reinsert the product id
      

    db.collection(COLLECTIONS.BID).remove({});
    db.collection(COLLECTIONS.TRANSACTION).remove({});
  });
}*/

// cleaning of notifications & isLive didn't work properly
// cleanDB();

module.exports = {
  COLLECTIONS,
  dbConnect
};
