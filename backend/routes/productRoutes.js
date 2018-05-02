const ProductService = require('../services/ProductService');

const PRODUCT_ROUTES = {
  PRODUCT: '/product',
  PRODUCT_BY_ID: '/product/:id'
};
Object.freeze(PRODUCT_ROUTES);

module.exports = (app) => {
    app.get(PRODUCT_ROUTES.PRODUCT, (req, res) => {
         ProductService.query().then(products => {
           res.json(products);
         }).catch(err => res.status(500).json(err));
    })
};
