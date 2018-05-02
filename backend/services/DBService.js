const DB_URL = 'mongodb://polka:polka@ds263109.mlab.com:63109/polka_db';
const { MongoClient } = require('mongodb');

const COLLECTIONS = {
  POLKA: 'polka',
  USER: 'user',
  PRODUCT: 'product'
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

module.exports = {
  COLLECTIONS,
  dbConnect,
};
