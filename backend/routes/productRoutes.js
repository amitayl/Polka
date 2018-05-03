const ProductService = require('../services/ProductService');

module.exports = app => {
  app.get('/product', (req, res) => {
    console.log(req.query.queryObj);
    const queryObj = JSON.parse(req.query.queryObj);
    
    ProductService.query(queryObj)
      .then(products => {
        res.json(products);
      })
      .catch(err => res.status(500).json(err));
  });
};
