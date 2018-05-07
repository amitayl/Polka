const TransactionService = require('../services/TransactionService');

app.get(`/transaction/:transactionId`, (req, res) => {
    const transactionId = req.params.transactionId;
    TransactionService.getById(transactionId)
      .then(transaction => {
        res.json(transaction);
      })
      .catch(err => res.status(500).send(err.message));
  });