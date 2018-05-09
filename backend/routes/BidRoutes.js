const BidService = require('../services/BidService.js');

module.exports = app => {
  app.post('/bid', (req, res) => {
    const bidData = req.body;
    
    BidService.send(bidData)
      .then(() => res.json())
      .catch(err => res.status(403).send({err}));
  });

  app.delete('/bid', (req, res) => {
    const bid = JSON.parse(req.query.bid);
    
    BidService.decline(bid)
      .then(() => res.json())
      .catch(err => res.status(500).send({err}));
  });
};
