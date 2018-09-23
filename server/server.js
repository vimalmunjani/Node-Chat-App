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

//whenever new user connects .. connection event is triggered 
io.on('connection', (socket) => {
    console.log(`New User connected`);

    // send a message to the one who connets
    socket.emit('newMessage', {
        from: 'Admin',
        message: 'Welcome to the chat app',
        createdAt: new Date().getTime()
    });

    // send the message to everyone except the one who sent
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        message: 'New user joined',
        createdAt: new Date().getTime()
    });

    // when a message is received from a user
    socket.on('createMessage', (message) => {
        console.log(`new message`, message);

        // send the received message to everyone including the one who sent
        io.emit('newMessage', {
            from: message.from,
            message: message.message,
            createdAt: new Date().getTime()
        });

    });

    socket.on('disconnect', () => {
        console.log(`User was disconnected`);
    });

});

server.listen(port, () => {
    console.log(`Server is runnnig on port ${port}`);
});