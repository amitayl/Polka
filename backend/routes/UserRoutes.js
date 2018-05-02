const UserService = require('../services/UserService');

const USER_ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  LOGOUT: '/logout'
};
Object.freeze(USER_ROUTES);

module.exports = app => {
  app.post(USER_ROUTES.LOGIN, (req, res) => {
    const userCredentials = req.body;
    UserService.checkLogin(userCredentials).then(userFromDB => {
      if (userFromDB) {
        delete userFromDB.password;

        // send back a cookie with userData
        req.session.user = userFromDB;
        res.json({ user: userFromDB });
      } else {
        // send back empty cookie
        req.session.user = null;
        res.status(403).send({ error: 'Login failed!' });
      }
    });
  });

  app.post(USER_ROUTES.REGISTER, (req, res) => {
    const userData = req.body;
    UserService.addUser(userData)
      .then(addedUser => res.json(addedUser))
      .catch(err =>
        res.status(403).send({ error: `Register failed, ${err}` })
      );
  });

  app.post(USER_ROUTES.LOGOUT, (req, res) => {
    req.session.reset();
    res.end('Loggedout');
  });
};
