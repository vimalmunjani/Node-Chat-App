var socket = io();

socket.on('connect', function () {
    console.log(`Connected to server`);

});

socket.emit('createMessage', {
    from: `vimal`,
    message: `helo how are you`
});

socket.on('newMessage', function (message) {
    console.log('newMessage', message);
});

socket.on('disconnect', function () {
    console.log(`Disconected from server`);
});