var productService = require('../services/ProductService')

// const DBService = require('./DBService')

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

function add(pet) {
    return new Promise((resolve, reject) => {
        return DBService.dbConnect()
            .then(db => {
                db.collection('pet').insert(pet, (err, res) => {
                    if (err) return reject(err);
                    console.log('addedPet: ', res.ops);
                    resolve(res.ops);
                })
            })

    });
}




module.exports = {
    query,
    add

}
