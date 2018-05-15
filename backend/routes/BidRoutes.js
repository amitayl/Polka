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

  app.delete('/bid', (req, res) => {
    console.log ('moshe', req.body);
    const bid = req.body;

    BidService.remove(bid)
      .then(() => {
        console.log('bid declined SUCCESS');
        TransactionService.add(bid,false)
        .then (_ => {
          console.log('added trans')
          res.json()
        })
      })
      // .catch(err => {
      //   console.log('bid declined FAIL')
      //   res.status(500).send({ err })
      // });
     
  });
};
