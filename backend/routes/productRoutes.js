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
    const productIds = req.params.productId.split(',');

    if (productIds.length > 1) {
      ProductService.getByIds(productIds)
        .then(products => {
          res.json(products);
        })
        .catch(err => res.status(500).send(err.message));
    } else {
      ProductService.getById(productIds[0])
        .then(product => {
          res.json(product);
        })
        .catch(err => res.status(500).send(err.message));
    }
  });
  // Add product

  app.post('/product', (req, res) => {
    const product = req.body;
    ProductService.add(product)
      .then(product => {
        res.json(product);
      })
      .catch(err => res.status(500).send('Could not add product'));
  });
};
