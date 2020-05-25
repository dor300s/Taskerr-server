
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

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    })
}

















// socket.on('chat newMsg', msg => {
//     console.log('rommmmmm', socket.myTopic)
//     // io.emit('chat addMsg', msg)
//     // emits only to sockets in the same room
//     io.to(socket.myTopic).emit('chat addMsg', msg)
// })
// socket.on('chat setRoom', toyId => {
//     if (socket.myTopic) {
//         socket.leave(socket.myTopic)
//     }
//     socket.join(toyId)
//     socket.myTopic = toyId;
//     console.log('sockett',socket.myTopic);

// })