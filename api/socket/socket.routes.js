
module.exports = connectSockets

let gChats = [];

function connectSockets(io) {
    io.on('connection', socket => {
        console.log('User connected');

        //Events
        socket.on('nav mounted', (msg) => {
            console.log('message: ' + msg);
            io.emit('nav mounted', msg);
          });

        socket.on('board updated', (id) => {
            socket.broadcast.emit(`board-updated-${id}`, id);
          });

        socket.on('user typing', (data) => {
            socket.broadcast.emit(`user-type-${data.id}`, data.status);
          });

        socket.on('user invite', (data) => {
            socket.broadcast.emit(`user-invite-${data.userId}`, data);
          });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    })
}
















