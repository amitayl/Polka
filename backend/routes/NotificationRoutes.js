const NotificationService = require('../services/NotificationService.js');

module.exports = app => {
  app.get('/notification', (req, res) => {
    const loggedInUserId = req.query.loggedInUserId;

    NotificationService.query(loggedInUserId)
      .then(notifications => {
        res.json(notifications);
      })
      .catch(err =>
        res.status(500).send({ error: `couldnt get notifications, ${err}` })
      );
  });
};
