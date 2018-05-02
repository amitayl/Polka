
const express = require('express');
const cors = require('cors');
const app = express();

const corsOptions = {
	origin: /http:\/\/127.0.0.1:\d+/,
	credentials: true
};

app.use(cors(corsOptions))

const http = require('http').Server(app);
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const clientSessions = require('client-sessions');

app.use(clientSessions({
  cookieName: 'session',
  secret: 'C0d1ng 1s fun 1f y0u kn0w h0w', // set this to a long random string!
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000
}));

// const UserService = require('./services/UserService')
// const addUserRoutes = require('./routes/UserRoutes.js')
// addUserRoutes(app)

http.listen(3000, () => {
  console.log('listening on *:3000');
});

