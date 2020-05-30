console.log('Taskerr');

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const session = require('express-session')
const app = express()
const port = process.env.PORT || 3030;
const cors = require('cors');
const http = require('http').createServer(app);
const io = require('socket.io')(http);


// Express App Config //
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('public'));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    };
    app.use(cors(corsOptions));
}
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'SECRETE3943738937462',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))



const boardRoutes = require('./api/board/board.routes')
const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/user/user.routes')
const connectSockets = require('./api/socket/socket.routes')


// routes
app.use('/api/board', boardRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
connectSockets(io)



app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });
http.listen(port, () => { console.log(`App listening on port ${port}!`) });