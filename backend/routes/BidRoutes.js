const BidService = require('../services/BidService.js');
const TransactionService = require('../services/TransactionService.js');

module.exports = app => {
  app.get('/bid', (req, res) => {
    const ownerProductId = req.query.ownerProductId;
    const bidderProductId = req.query.bidderProductId;

    BidService.isExists(ownerProductId, bidderProductId)
      .then(isExists => {
        res.json(isExists);
      })
      .catch(() => {
        res.status(400).send();
      });
  });

  app.post('/bid', (req, res) => {
    const bidData = req.body;

    BidService.send(bidData)
      .then(() => {
        res.json();
      })
      .catch(() => {
        res.status(403).send();
      });
  });

  app.post('/decline', (req, res)=> {
    console.log()
    const bid = req.body;
    console.log(bid);

    BidService.decline(bid)
      .then(() => {
        res.json()
      })
      .catch(err => {
        res.status(500).send({ err })
      });
  })

  app.post('/accept', (req, res)=> {
    const bid = req.body;

    BidService.accept(bid)
      .then(() => {
        res.json()
      })
      .catch(err => {
        res.status(500).send({ err })
      });
  })
};
