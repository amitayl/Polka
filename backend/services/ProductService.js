const mongo = require('mongodb');
var DBService = require('./DBService');


const DBService = require('./DBService')

function query(criteria) {
    if (criteria.weight) criteria.weight = +criteria.weight; 
    return new Promise((resolve, reject) => {
        return DBService.dbConnect()
            .then(db => {
                db.collection('pet').find(criteria).toArray((err, pets) => {
                    if (err) return reject(err);
                    console.log('PETS: ', pets);
                    resolve(pets);
                })
            })

    });
}

function add(product) {
    return new Promise((resolve, reject) => {
        return DBService.dbConnect()
            .then(db => {
                db.collection('product').insert(product, (err, res) => {
                    if (err) return reject(err);
                    console.log('productPet: ', res.ops);
                    resolve(res.ops);
                })
            })

    });
}




module.exports = {
    query,
    add

}

module.exports = {
  query,
  add
}