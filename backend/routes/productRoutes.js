const ProductService = require('../services/ProductService');

module.exports = (app) => {
    app.get('/product', (req, res) => {
        // console.log(req.params);
         ProductService.query().then(products => {
           res.json(products);
         }).catch(err => res.status(500).json(err));
    })
};
