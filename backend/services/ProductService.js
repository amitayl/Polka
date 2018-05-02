const DBService = require('./DBService');

function query(criteria) {
  if (criteria.weight) criteria.weight = +criteria.weight;
  return new Promise((resolve, reject) => {
    return DBService.dbConnect().then(db => {
      db
        .collection(DBService.COLLECTIONS.PRODUCT)
        .find(criteria)
        .toArray((err, pets) => {
          if (err) reject(err)
          else resolve(pets);
        });
    });
  });
}

function add(product) {
  return new Promise((resolve, reject) => {
    return DBService.dbConnect().then(db => {
      db.collection(DBService.COLLECTIONS.PRODUCT).insert(pet, (err, res) => {
        if (err) return reject(err);
        resolve(res.ops);
      });
    });
  });
}

module.exports = {
  query,
  add
};