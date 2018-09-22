const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log(`New User connected`);

    socket.on('createMessage', (message) => {
        console.log(`new message`, message);
    });

    socket.emit('newMessage', {
        from: '....',
        message: 'I am emitted from server new message',
        createdAt: 'today'
    });

    socket.on('disconnect', () => {
        console.log(`User was disconnected`);
    });

});


server.listen(port, () => {
    console.log(`Server is runnnig on port ${port}`);
});