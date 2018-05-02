const socketIo = require('socket.io');

const connectedCount = 0;
const allSockets = [];

function init(http) {
  const io = socketIo(http);
  io.on('connection', socket => {
    connectedCount++;
    allSockets.push(socket);

    socket.on('disconnect', () => {
      connectedCount--;
      allSockets.splice(allSockets.findIndex(s => s === socket), 1);
    });

    socket.on('chat newMessage', msg => {
      if (socket.theTopic) {
        io.to(socket.theTopic).emit('chat message', msg);
      } else {
        io.emit('chat message', msg);
      }
    });

    socket.on('chat setTopic', topic => {
      if (socket.theTopic) socket.leave(socket.theTopic);
      socket.join(topic);
      socket.theTopic = topic;
    });

    socket.on('chat sendStatus', statusTxt => {
      socket.broadcast.emit('chat setStatusTxt', statusTxt);
    });
  });
}

module.exports = {
  init
};