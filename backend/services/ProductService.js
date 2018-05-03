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
function getById(productId) {
  productId = new mongo.ObjectID(productId);
  return new Promise((resolve, reject)=>{
      DBService.dbConnect()
      .then(db=>{
        console.log ('productId before db' , productId);
          db.collection(DBService.COLLECTIONS.PRODUCT).findOne({_id: productId}, function (err, product) {
              if (err)    reject(err)
              else       {
                console.log (product);
                 resolve(product);
              }
              db.close();
          });
      })
  });
}




module.exports = {
  query,
  add
};