const DBService = require('./DBService');

function query(criteria = {}) {
  return new Promise((resolve, reject) => {
    return DBService.dbConnect().then(db => {
      db
        .collection(DBService.COLLECTIONS.PRODUCT)
        .find(criteria)
        .toArray((err, products) => {
          if (err) reject(err)
          else resolve(products);
        });
    });
  });
} 

function add(product) {
  return new Promise((resolve, reject) => {
    return DBService.dbConnect().then(db => {
      db.collection(DBService.COLLECTIONS.PRODUCT).insert(product, (err, res) => {
        if (err) reject(err)
        else resolve(res.ops);
      });
    });
  });
}

module.exports = {
  query,
  add
};