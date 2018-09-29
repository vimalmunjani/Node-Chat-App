var socket = io();

socket.on('connect', function () {
    console.log(`Connected to server`);
});


socket.on('newMessage', function (message) {

    let createdTime = moment(message.createdAt).format('h:mm a');
    console.log('newMessage', message);

    let template = $('#message-template').html();
    let html = Mustache.render(template,{
        text: message.text,
        from: message.from,
        createdAt: createdTime
    });

    $('#messages').append(html);

    // var list = $('<li></li>');
    // list.text(`${message.from} ${createdTime}: ${message.text} `);

    // $('#messages').append(list);
});

socket.on('newLocationMessage', function (locationMessage) {

    let createdTime = moment(message.createdAt).format('h:mm a');

    console.log('newLocationMessage', locationMessage);

    let template = $('#location-message-template').html();
    let html = Mustache.render(template,{
        url: locationMessage.url,
        from: locationMessage.from,
        createdAt: createdTime
    });

    $('#messages').append(html);

});

socket.on('disconnect', function () {
    console.log(`Disconected from server`);
});


$('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: `User`,
        text: $('#message').val()
    }, function () {
        $('#message').val('');
        $('#message').focus();
    });

});

var locationButton = $('#send-location');

locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation Not supported by your browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);

        socket.emit('createLocationMessage', {
            from: `User`,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, function () {
            locationButton.removeAttr('disabled').text('Send location');
            $('#message').focus();
        });

    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    })
});

// $('#send-button').click(function(){
//     $('#message').val('');
// });