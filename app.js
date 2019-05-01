var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
//DATABASE

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// SOCKET CODE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import React from "react";
import $ from "jquery";



//import io from "socket.io-client";

class Chat extends React.Component{
//import io from "socket.io-client";
componentDidMount = () => {
const MongoClient = require('mongodb').MongoClient;
const io = require('socket.io').listen(4000);

let url = 'mongodb://127.0.0.1/socketchat';

/*
* Connect to MongoDB
*/
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log('Connected to MongoDB');

    // Set db constants
    const socketchat = db.db('socketchat');
    const users = socketchat.collection('users');
    const messages = socketchat.collection('messages');


    /*
    * Connect to socket.io
    */
    io.on('connection', function (socket) {

        console.log('Connected to socket.io, ID: ' + socket.id);

        /*
        * Handle enter chat / log on
        */
        socket.on("username", function (username) { //catching the emit from client.js 
            console.log(username);
            users.find().toArray(function (err, res) {
                if (err) throw err;
                socket.emit('users', res); 
            });

            messages.find().toArray(function (err, res) {
                if (err) throw err;
                socket.emit('messages', res); 
            });
            //insert user into user collections

            users.insertOne({socketID: socket.id, username: username});
            //want to emit another event,broadcase means everyone except sender will recieve this emit
            socket.broadcast.emit('logon', { //will catch this in client.js
                socketID: socket.id, //going to pass socketid and username
                username: username
            });
        });

        /*
        * Handle log off
        *///disconnect exists in socket api
        socket.on('disconnect', function () {
            console.log('User ' + socket.id + ' disconnected!');//log the user and the id and disconnect it

            users.deleteOne({socketID: socket.id}, function () {//will delete user from collection
                socket.broadcast.emit('logoff', socket.id);//call back that sends message to everyone except sender that someone disconnected
            });
        });

        /*
        * Handle chat input
        */
        socket.on('input', function (data) {

            if (data.publicChat) {
                messages.insertOne({username: data.username, message: data.message, date: data.date});
            }

            io.emit('output', data);
        });

        /*
        * Handle second user trigger
        */
        socket.on('secondUserTrigger', function (data) {
            socket.to(data.secondUserID).emit('secondUserChatWindow', data);
        });

    });


});
}
//$(document).ready(function () {
//componentDidMount = () => {

$(function () {

    // Connect to socket.io
    var socket = io.connect('http://127.0.0.1:4000');

    /*
    * Enter chat and load users
    */
    $("a#enterChat").click(function (e) {
        e.preventDefault();

        let username = $("#username").val(); //catching value of input and storing it in username

        localStorage.setItem("username", username); //also saving it in local storage as well

        if (username != "") { //if the username isn't empty

            socket.emit("username", username); //emitting username event, meaning throwing it for the server to catch
            //These add and remove basically show chat box after person enters a username
            $("div#enterUsername").addClass('hidden');//
            $("div#chatMain").removeClass('hidden');

            socket.on('users', function (data) {
                data.forEach(element => {
                    if ( ! $("li#" + element.socketID).length && $("div#userList li").text() != element.username) {
                        $("div#userList ul").append('<li id="' + element.socketID + '">' + element.username + '</li>');
                    }
                });
            });

            $('div.chatroom.active').animate({scrollTop: $('div.chatroom.active').prop('scrollHeight')}, 1000);
            
        } else {
            alert('You must enter a username!')
        }

    });

    /*
    * Enter chat on ENTER
    */
    $("input#username").keypress(function (e) {
        let username = $("#username").val();

        if (e.which == 13) {
            if (username != "") {
                $("a#enterChat").click();
            } else {
                alert('You must enter a username!')
            }
        }


    });

    /*
    * Handle log on
    */
    socket.on('logon', function (data) { //will catch emit event logon from server.js
        $("div#userList ul").append('<li id="' + data.socketID + '">' + data.username + '</li>'); //append user to empty ul
    });//id of li is going to be users socket id, the text is going to be username(data.username)

    /*
    * Handle log off
    */
    socket.on('logoff', function (id) {
        $("li#" + id).remove(); //will remove li of uswe
        localStorage.removeItem("username"); //will remove local storage of username
    });

    /*
    * Handle chat input
    */
    $("#chatText").keypress(function (e) {

        if (e.which == 13) {

            let message = $("#chatText").val();
            let windowID = $("div#chatWindows div.active").attr('id');
            let publicChat = true;7
            let secondUsername = false;
            let secondUserID;
            let data;

            if (message != "") {

                if (! ($("#publicChat").hasClass('active'))) {
                    publicChat = false;
                    let usersDiv = $("div.chatroom.active").attr('id');
                    let userArray = usersDiv.split("-");

                    secondUsername = userArray[1];
                    secondUserID = $("li:contains(" + secondUsername + ")").attr('id');
                    if (! secondUserID) {
                        secondUsername = userArray[0];
                        secondUserID = $("li:contains(" + secondUsername + ")").attr('id');
                    }

                    data = {
                        from: localStorage.getItem("username"),
                        message: message,
                        date: moment().format("DD/MM/YYYY HH:mm"),
                        secondUserID: secondUserID,
                        secondUsername: secondUsername                    
                    };

                    // console.log(data);
                    socket.emit('secondUserTrigger', data);
                }

                socket.emit('input', {
                    username: localStorage.getItem("username"),
                    message: message,
                    date: moment().format("DD/MM/YYYY HH:mm"),
                    windowID: windowID,
                    publicChat: publicChat
                });

            $("#chatText").val("");
            e.preventDefault();

            } else {
                alert('You must enter a message');
            }
        }        

    });

    /*
    * Handle output
    */
    socket.on('output', function (data) {

        let windowID;

        if (! $("div#chatWindows div#"+data.windowID).length ) {
            let userArray = data.windowID.split("-");
            windowID = userArray[1] + "-" + userArray[0];
        } else {
            windowID = data.windowID;
        }

        if (data.publicChat && ! $("div#mainroom").hasClass('active')) {
            $("div#mainroom").addClass('new');
        } else {
            if (! $("div#"+windowID).hasClass('active')) {
                $("div#rooms div#"+data.username).addClass('new');
            }
        }

        $("div#chatWindows div#"+windowID).append("<p>[" + data.date + "] <b>" + data.username +  "</b>: " + data.message + "</p>");

        $('div.chatroom.active').animate({scrollTop: $('div.chatroom.active').prop('scrollHeight')}, 1000);
    });

    /*
    * Load chat messages
    */
    socket.on('messages', function (data) {
        data.forEach(element => {
            $("div#publicChat").append("<p>[" + element.date + "] <b>" + element.username +  "</b>: " + element.message + "</p>");
        });
    });

    /*
    * Handle private chat 
    */
    $(document).on("dblclick", "div#userList li", function () {

        let socketID = $(this).attr('id');
        let senderUsername = localStorage.getItem("username");
        let receiverUsername = $(this).text();

        $("#chatText").focus();

        if ( $("div#rooms div#"+receiverUsername).length ) {
            $("div#rooms div#"+receiverUsername).click();
            return;
        }

        $("div#rooms > div").removeClass('active');
        $("div#chatWindows > div").removeClass('active');

        $("div#rooms").append("<div id=" + receiverUsername + " class='active'>" + "<span>x</span>" + receiverUsername + "</div>");
        $("div#chatWindows").append("<div id=" + senderUsername + "-" + receiverUsername + " class='chatroom active'></div>");
    });

    /*
    * Handle second user chat window
    */
    socket.on('secondUserChatWindow', function (data) {
        // console.log(data);
        if ( $("div#"+data.from).length ) return;

        $("div#rooms > div").removeClass('active');
        $("div#chatWindows > div").removeClass('active');

        $("div#rooms").append("<div id=" + data.from + " class='active'>" + "<span>x</span>" + data.from + "</div>");
        $("div#chatWindows").append("<div id=" + data.from + "-" + data.secondUsername + " class='chatroom active'></div>");
    });

    /*
    * Choose room
    */
    $("div#rooms").on("click", "div", function () {

        $("div#rooms > div").removeClass('active');
        $("div#chatWindows > div").removeClass('active');

        $(this).addClass('active');
        $(this).removeClass('new');

        if ( $("div#mainroom").hasClass('active') ) {
            $("#publicChat").addClass('active');
        } else {

            let firstUsername = localStorage.getItem("username");
            let secondUsername = $(this).attr('id');

            $("div#chatWindows div#"+firstUsername + "-" + secondUsername).addClass('active');
            $("div#chatWindows div#"+secondUsername + "-" + firstUsername).addClass('active');
        }
    });

    /*
    * Close private chat
    */
    $("div#rooms").on('click', 'span', function (e) {
        e.stopPropagation();

        let firstUsername = localStorage.getItem("username");
        let secondUsername = $(this).parent().attr('id');

        $("div#chatWindows div#"+firstUsername + "-" + secondUsername).remove();
        $("div#chatWindows div#"+secondUsername + "-" + firstUsername).remove();

        $(this).parent().remove();

        if ( $("div#rooms > div").length == 1 ) {
            $("div#mainroom").addClass('active');
            $("div#publicChat").addClass('active');
        }
    });

});
//});
}
//}

export default app;


//Jesse's Notes: 
// create a socket catch handler 
// connect and recurvsiely call itself 
// try, fail, connect, try again, 

// have gaurd rai;s; TCP 
// test in advance for 30 connections 


 
