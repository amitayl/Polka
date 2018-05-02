const ProductService = require('../services/ProductService');

const PRODUCT_ROUTES = {
  PRODUCT: '/product',
  PRODUCT_BY_ID: '/product/:id'
};
Object.freeze(USER_ROUTES);

module.exports = app => {
    // app.get(PRODUCT_ROUTES.PRODUCT, (req, res) => {
    //      ProductService.query().then()
    // })
};
