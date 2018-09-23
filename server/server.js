const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

// utils
const {generateMessage, genarateLocationMessage} = require('./utils/message');

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
    socket.emit('newMessage', generateMessage(`Admin`, `Welcome to Chat App`));

    // send the message to everyone except the one who sent
    socket.broadcast.emit('newMessage', generateMessage(`Admin`, `New User joined`));

    // when a message is received from a user
    socket.on('createMessage', (message) => {

        // send the received message to everyone including the one who sent
        io.emit('newMessage', generateMessage(message.from, message.text));

    });

    // when a location message is received from a user
    socket.on('createLocationMessage', (locationMessage) => {

        console.log('locationMessage', locationMessage);

        // send the received location message to everyone including the one who sent
        io.emit('newLocationMessage', genarateLocationMessage(locationMessage.from, locationMessage.latitude, locationMessage.longitude));

    });

    socket.on('disconnect', () => {
        console.log(`User was disconnected`);
    });

});

server.listen(port, () => {
    console.log(`Server is runnnig on port ${port}`);
});