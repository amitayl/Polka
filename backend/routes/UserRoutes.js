const UserService = require('../services/UserService');

module.exports = app => {
  app.post('/user', (req, res) => {
    const userData = req.body;
    UserService.add(userData)
      .then(addedUser => res.json(addedUser))
      .catch(err => res.status(403).send({ error: `Register failed, ${err}` }));
  });

  
  app.get('/user/', (req, res) => {
    const loginData = req.query.loginData;
    UserService.checkLogin(loginData).then(userFromDB => {
      if (userFromDB) {
        
        delete userFromDB.password;

        // send back a cookie with userData
        req.session.user = userFromDB;
        res.json(userFromDB);
      } else {
        // send back empty cookie
        req.session.user = null;
        res.status(403).send({ error: 'Login failed!' });
      }
    });
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

  app.post('/logout', (req, res) => {
    req.session.reset();
    res.end('Loggedout');
  });
};
