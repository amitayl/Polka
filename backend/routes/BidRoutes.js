const BidService = require('../services/BidService.js');

module.exports = app => {
  app.post('/bid', (req, res) => {
    const bidData = req.body;
    
    BidService.send(bidData)
      .then(() => res.json())
      .catch(err => res.status(403).send({ error: `Register failed, ${err}` }));
  });

  app.delete('/bid', (req, res) => {
    const bidId = req.query.bidId;
    console.log('bid routes', {bidId});
    
    BidService.declineBid(bidId)
      .then(() => res.json())
      .catch(err => res.status(403).send({ error: `Register failed, ${err}` }));
  });
};
