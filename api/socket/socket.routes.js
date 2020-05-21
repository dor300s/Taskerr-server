
module.exports = connectSockets

let gChats = [];

function connectSockets(io) {
    io.on('connection', socket => {
        console.log('connected');


        socket.on('chat newMsg', msg => {
            console.log('rommmmmm', socket.myTopic)
            // io.emit('chat addMsg', msg)
            // emits only to sockets in the same room
            io.to(socket.myTopic).emit('chat addMsg', msg)
        })
        socket.on('chat setRoom', toyId => {
            if (socket.myTopic) {
                socket.leave(socket.myTopic)
            }
            socket.join(toyId)
            socket.myTopic = toyId;
            console.log('sockett',socket.myTopic);
            
        })
    })
}