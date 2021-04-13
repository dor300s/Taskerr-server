
module.exports = connectSockets

function connectSockets(io) {
  io.on('connection', socket => {
    console.log('User connected');
    
    //Events
        socket.on('user login', () => {
      socket.broadcast.emit('newuserconnect')
    });

    socket.on('board updated', (id) => {
      socket.broadcast.emit(`board-updated-${id}`, id);
    });

    socket.on('user typing', (data) => {
      socket.broadcast.emit(`user-type-${data.id}`, data.status);
    });

    socket.on('user invite', (data) => {
      socket.broadcast.emit(`user-invite-${data.invitedUserId}`, data);
    });

    socket.on('user card assign', (data) => {
      socket.broadcast.emit(`user-card-assign-${data.assignedUserId}`, data);
    });

    socket.on('user logged-out', () => {
      socket.broadcast.emit(`user-disconnected`);
    });

    socket.on('user log-out-ui', () => {
      socket.broadcast.emit(`user-disconnected-ui`);
    });

    socket.on('disconnect', () => {
      console.log('disconnect');
      socket.broadcast.emit(`user-disconnected-test`);

    });
  })
}
















