const TransactionService = require('../services/TransactionService');


module.exports = app => {
  
  app.get('/transaction/:transactionId', (req, res) => {
    const transactionId = req.params.transactionId;
    TransactionService.getById(transactionId)
      .then(transactionObj => res.json(transactionObj))
      .catch(err => res.status(500).json(err));
  });

  app.post(`/transaction/`, (req, res) => {
    let transaction = req.body;
    TransactionService
      .addTransaction(transaction)
      .then(transaction => res.json(Transaction));
  })

  app.get('/dealsByUserId/:userId', (req, res) => {
    const userId = req.params.userId;

    TransactionService.getDealsByUserId(userId)
      .then(deals => res.json(deals))
      .catch(err => res.status(500).json(err));
  });
}

