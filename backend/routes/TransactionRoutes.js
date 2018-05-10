const TransactionService = require('../services/TransactionService');

module.exports = app => {
  app.get(`/transaction`, (req, res) => {
      TransactionService.query()
        .then(transactions => {
          res.json(transactions);
        })
        .catch(err => res.status(500).send(err.message));
    });
}

// app.get(`/transaction/:transactionId`, (req, res) => {
//     const transactionId = req.params.transactionId;
//     TransactionService.getById(transactionId)
//       .then(transaction => {
//         res.json(transaction);
//       })
//       .catch(err => res.status(500).send(err.message));
//   });