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

  app.delete('/notification', (req, res) => {
    const notification = JSON.parse(req.query.notification);

    NotificationService.remove(notification)
      .then(() => {
        res.json();
      })
      .catch(err =>
        res.status(500).send({ error: `couldnt delete notification, ${err}` })
      );
  });

};
