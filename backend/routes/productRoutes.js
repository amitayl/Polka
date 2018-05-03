const ProductService = require('../services/ProductService');



module.exports = app => {
    
    app.get(`/product/:productId`, (req, res) => {
        console.log('gotToRoutes' )

        const productId =  req.params.productId;
        console.log ('productid' , productId);
        ProductService.getById(productId)
            .then(product => {
                res.json(product)
            })
            .catch(err => res.status(500).send(err.message))


        // res.json('moshe')

        // let productId = req.params.productId;
        // console.log('productId', productId);
        // res.end();
    })
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

  // Add product
  app.post('/product', (req, res) => {
    const product = req.body;
    ProductService.add(product)
      .then(product => {
        res.json(product);
      })
      .catch(err => res.status(500).send("Could not add product"));
  });
};
