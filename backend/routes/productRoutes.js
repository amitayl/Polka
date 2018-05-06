const ProductService = require('../services/ProductService');

module.exports = app => {
  app.get('/product', (req, res) => {
    console.log(req.query.queryObj);
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

  app.get(`/product/getOffers/:productId`, (req, res) => {
    console.log ('get to routes')
    const productId = req.params.productId;
    console.log ('productId' , productId )
    ProductService.getOffersByProductId(productId)
      .then(product => {
        res.json(product);
      })
      .catch(err => res.status(500).send(err.message));
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
