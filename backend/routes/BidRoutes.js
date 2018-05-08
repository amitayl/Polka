const BidService = require('../services/BidService.js');

module.exports = app => {
  app.post('/bid', (req, res) => {
    const bidData = req.body;
    
    BidService.send(bidData)
      .then(() => res.json())
      .catch(err => res.status(403).send({err}));
  });

  app.delete('/bid', (req, res) => {
    const notification = JSON.parse(req.query.notification);
    
    BidService.decline(notification)
      .then(() => res.json())
      .catch(err => res.status(500).send({err}));
  });
};
