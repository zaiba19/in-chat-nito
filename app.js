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

// express initializes app to be a function handler 
var app = require('express')();

//app is supplied an HTTP server 
var http = require('http').Server(app);

//passing http server to socket (handles the client)
var io = require('socket.io')(http);

//using sendFile to link to our index.html instead of having strings in this file (i.e Hello World)
app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
  });

// listens on the connection event for incoming sockets and sends it to everyone on the chat including sender
io.on('connection', function(socket){
    socket.on('chat message', function(msg){
    io.emit('chat message', msg); 
  });
}); 

//to make the http server listen on port 3000 
http.listen(3000, function(){
  console.log('listening on *:3000');
});


//Jesse's Notes: 
// create a socket catch handler 
// connect and recurvsiely call itself 
// try, fail, connect, try again, 

// have gaurd rai;s; TCP 
// test in advance for 30 connections 


 