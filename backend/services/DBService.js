const DB_URL = 'mongodb://polka:polka@ds263109.mlab.com:63109/polka_db';
const { MongoClient, ObjectID } = require('mongodb');

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
    MongoClient.connect(DB_URL, (err, db) => {
      if (err) reject(err);
      else resolve(db);
    });
  });
  prmConnect.catch(err => console.error(err));
  return prmConnect;
}
function pcl(obj) {
  var e = JSON.stringify(obj, null, 2)
  console.log(e)
}




module.exports = {
  COLLECTIONS,
  dbConnect,
};
