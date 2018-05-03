const ProductService = require('../services/ProductService');

module.exports = (app) => {
    app.get('/product', (req, res) => {
        // console.log(req.params);
         ProductService.query().then(products => {
           res.json(products);
         }).catch(err => res.status(500).json(err));
    })
    app.get(`/product/:productId`, (req, res) => {
        console.log ('productId' ,)
        // const productId =  req.params.toyId;
        ProductService.getById(productId)
        .then (product =>{
            res.json(product)
        })
        .catch(err => res.status(500).send(err.message))
            
        
        // res.json('moshe')

        let productId = req.params.productId;

        console.log ('productId' ,productId);
        res.end();
        // // productService.getById(productId)
        //     .then(product => {
        //         res.json(product)
        //     })
        //     .catch(err => res.status(500).send(err.message))
    })
};
