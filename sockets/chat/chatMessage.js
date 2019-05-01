const User = require('../../models/User');

// module.exports = (io, socket) => {
//     socket.on('chat message', function (msg) => {
//         const user = await User.findOne({ socketId: socket.id });

//         io.emit('chat message', { nickname: user.nickname, message: msg.message });
//     });
// }

$(function () {

    // //instantiates io 
     var socket = io();

    //created an event 
    $('form').submit(function(e){

    e.preventDefault(); // prevents page reloading

    //when user sends message i.e '#m', server gets it as chat message event 
    socket.emit('chat message', $('#m').val());

    //m is message 
    $('#m').val('');

    return false;
});
    socket.on('chat message', function(msg){
        $('#messages').append($('<li>').text(msg));
    });
});