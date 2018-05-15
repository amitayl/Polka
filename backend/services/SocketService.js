const socketIo = require('socket.io');

// const connectedCount = 0;
// const allSockets = [];

function init(http) {
  const io = socketIo(http);

  io.on('connection', socket => {
    console.log('connected to root io');

    socket.on('sendLoggedInUserId', loggedInUserId => {
      const loggedInUserSocket = io.of('/' + loggedInUserId);

      const nsps = Object.keys(io.sockets.clients().server.nsps);
      console.log('NSPS BIATCH', nsps);

      // when bid is sent, emit the notification to the owner
      loggedInUserSocket.on('bidSent', ownerId => {
        console.log('emitting product bidded to', ownerId);
        
        const ownerSocket = io.of('/' + ownerId);
        ownerSocket.emit('productBidded', { notification: 'blahblah' });
      });
    });
  });
}

module.exports = {
  init
};
