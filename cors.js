/// IN YOUR BACKEND
// npm i cors
const cors = require('cors');

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('public'));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    };
    app.use(cors(corsOptions));
}


/// IN YOUR FRONTEND
// to enable cookies in your axios requests
import Axios from 'axios'

const axios = Axios.create({
    withCredentials: true
});
// then use axios like you normally do
