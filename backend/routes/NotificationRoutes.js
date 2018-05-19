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

  /* app.get('/accepted-bid', (req, res) => {
    const userId = req.query.userId;

    NotificationService.getAcceptedBids(userId)
      .then(acceptedBids => {
        res.json(acceptedBids);
      })
      .catch(err =>
        res.status(500).send({ error: `couldnt get acceptedBids, ${err}` })
      );
  }); */

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

  app.put('/notification-viewed', (req, res) => {
    const notificationsToUpdate = req.body.notificationsToUpdate;
    const loggedInUserId = req.body.loggedInUserId;

    NotificationService.setViewed(notificationsToUpdate, loggedInUserId)
      .then(() => {
        res.json();
      })
      .catch(err =>
        res.status(500).send({ error: `couldnt update notifications isViewed, ${err}` })
      );
  });

};
