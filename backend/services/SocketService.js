const socketIo = require('socket.io');

// let connectedCount = 0;
// const allSockets = [];
// const rooms = [];

let io;

function init(http) {
  io = socketIo(http);

  io.on('connection', socket => {
    // connectedCount++;
    // allSockets.push(socket);
    socket.on('joinSocketById', loggedInUserId=> {
      socket.join(loggedInUserId);
    })

    socket.on('disconnect', () => {
      ('user disconnected');
      // connectedCount--;
      // allSockets.splice(allSockets.findIndex(s => s === socket), 1);
    });

    // socket.on('sendNotification', ()=> {
    //   ('hey');
    // })

    // socket.on('chatRequest', data => {
    //   socket.join(data.roomId);
    //   io
    //     .to(data.roomId)
    //     .emit('chat message', { txt: 'new user conneted to room' });
    //   ('sending alert:', data);
    // });

    // socket.on('chat newMessage', data => {
    //   io.to(data.roomId).emit('chat message', data);
    //   io.emit('alert user', data);
    // });
  });
}

function emitGetNotifications(userId) {
  io.to(userId).emit('emitGetNotifications');
}

module.exports = {
  init,
  emitGetNotifications
};
