
module.exports = connectSockets

function connectSockets(io) {
  io.on('connection', socket => {
    console.log('User connected');
    socket.broadcast.emit('newuserconnect')

    //Events

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

    

    socket.on('disconnect', () => {
      console.log('disconnect');

    });
  })
}
















