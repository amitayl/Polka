const ProductService = require('../services/ProductService');

module.exports = app => {
  app.get('/product', (req, res) => {
    const queryObj = JSON.parse(req.query.queryObj);
    const colsToGet = JSON.parse(req.query.colsToGet);
    ProductService.query(queryObj, colsToGet)
      .then(products => {
        res.json(products);
      })
      .catch(err => res.status(500).json(err));
  });

  app.get(`/product/:productId`, (req, res) => {
    const productId = req.params.productId;
    ProductService.getById(productId)
      .then(product => {
        res.json(product);
      })
      .catch(err => res.status(500).send(err.message));
  });
};
