const BidService = require('../services/BidService.js');

module.exports = app => {
  app.post('/bid', (req, res) => {
    const bidData = req.body;
    console.log(bidData);
    BidService.send(bidData)
      .then(bidSent => res.json(bidSent))
      .catch(err => res.status(403).send({ error: `Register failed, ${err}` }));
  });
};
