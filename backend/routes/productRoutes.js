const ProductService = require('../services/ProductService');

module.exports = app => {
  app.get('/product', (req, res) => {
    const queryObj = JSON.parse(req.query.queryObj);
    const colsToGet = JSON.parse(req.query.colsToGet);
    const sortBy = JSON.parse(req.query.sortBy);
    const limit = JSON.parse(req.query.limit);

    let userCoords = req.query.userCoords;
    if (userCoords) userCoords = JSON.parse(userCoords);

    ProductService.query(queryObj, colsToGet, userCoords, sortBy, limit)
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
    const productId = req.params.productId;
    ProductService.getProductDetailsById(productId)
      .then(product => {
        res.json(product);
      })
      .catch(err => res.status(500).send(err.message));

  });

  app.get(`/product/getOffers/:productId`, (req, res) => {
    const productId = req.params.productId;
    ProductService.getOffersByProductId(productId)
      .then(products => {
        res.json(products);
      })
      .catch(err => res.status(500).send(err.message));
  });

  app.post('/product', (req, res) => {
    const product = req.body;
    
    ProductService.add(product)
      .then(addedProductId => {
        res.json(addedProductId);
      })
      .catch(err => res.status(500).send('Could not add product'));
  });

  app.post('/product-views-increment/', (req, res) => {
    const productId = req.body.productId;

    ProductService.incrementViews(productId)
    .then(() => {
      res.json();
    })
    .catch(err => res.status(500).send('Could not increment views'));
  })

  app.put('/product', (req, res) => {
    const product = req.body.product;

    ProductService.update(product)
    .then(() => {
      res.json();
    })
    .catch(err => res.status(500).send('Could not update product'));
  })
};
