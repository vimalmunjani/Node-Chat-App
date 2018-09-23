var socket = io();

socket.on('connect', function () {
    console.log(`Connected to server`);
});


socket.on('newMessage', function (message) {
    console.log('newMessage', message);

    var list = $('<li></li>');
    list.text(`${message.from}: ${message.text} `);

    $('#messages').append(list);
});

socket.on('newLocationMessage', function (locationMessage) {
    console.log('newLocationMessage', locationMessage);

    var list = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>');

    list.text(`${locationMessage.from}: `);
    a.attr('href', locationMessage.url);

    list.append(a);

    $('#messages').append(list);
});

socket.on('disconnect', function () {
    console.log(`Disconected from server`);
});


$('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: `User`,
        text: $('#message').val()
    });

});

var locationButton = $('#send-location');

locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation Not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);

        socket.emit('createLocationMessage', {
            from: `User`,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });

    }, function () {
        alert('Unable to fetch location');
    })
});