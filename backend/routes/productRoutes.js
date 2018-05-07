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

  app.get(`/product/:productIds`, (req, res) => {
    const productIds = req.params.productIds.split(',');

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

  app.get(`/productDetails/:productId`, (req, res) => {
    console.log ('moshe');
    const productId = req.params.productId;
    ProductService.getProductDetailsById(productId)
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
