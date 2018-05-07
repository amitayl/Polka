const BidService = require('../services/BidService.js');

module.exports = app => {
  app.post('/bid', (req, res) => {
    const bidData = req.body;
    
    BidService.send(bidData)
      .then(() => res.json())
      .catch(err => res.status(403).send({ error: `Register failed, ${err}` }));
  });
};
