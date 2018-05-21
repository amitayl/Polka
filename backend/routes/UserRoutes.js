const UserService = require('../services/UserService');

module.exports = app => {
  app.post('/user', (req, res) => {
    const userData = req.body;
    
    UserService.add(userData)
      .then(addedUser => res.json(addedUser))
      .catch(err => {
        res.status(403).send(err)
      });
  });

  app.get('/users', (req, res) => {
    UserService.query()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.status(403).send({ err }));
  });

  app.get('/user', (req, res) => {
    const loginData = req.query.loginData;
    UserService.checkLogin(loginData)
      .then(userFromDB => {
        delete userFromDB.password;
        res.json(userFromDB);

        // send back a cookie with userData
        // req.session.user = userFromDB;
      })
      .catch(err => {
        res.status(400).send(err);
        // // send back empty cookie
        // req.session.user = null;
      });
  });

  app.delete('/user', (req, res) => {
    const userId = req.query.userId;
    UserService.remove(userId)
      .then(userId => {
        res.json(userId);
      })
      .catch(err => res.status(403).send(err));
  });

  app.get(`/user/:userId`, (req, res) => {
    const userId = req.params.userId;

    UserService.getById(userId)
      .then(user => {
        delete user.password;
        res.json(user);
      })
      .catch(err => res.status(500).send(err.message));
  });

  app.put ('/review', (req, res) => {
    const review = req.body;
    UserService.addReview(review)
      .then(addedReview => res.json(addedReview))
      .catch(err => res.status(403).send({ error: `Register failed, ${err}` }));
  });

  app.post('/logout', (req, res) => {
    req.session.reset();
    res.end('Loggedout');
  });

  app.put('/user', (req, res) => {
    const userData = req.body;

    UserService.update(userData)
      .then(() => res.json())
      .catch(err => res.status(500).send({ error: `user update failed, ${err}` }));
  });
};
