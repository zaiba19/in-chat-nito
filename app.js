var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var signupRouter = require('./routes/signup');
var loginRouter = require('./routes/login');
var coursesRouter = require('./routes/courses');
var logoutRouter = require('./routes/logout');
var cookieRouter = require('./routes/cookie');
var app = express();
//DATABASE

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client','build')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signup', signupRouter);
app.use('/login',loginRouter);
app.use('/courses',coursesRouter);

app.get('/*',function(req, res, next) {
	res.sendFile(path.join(__dirname,'client','build','index.html'));
});




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
  console.log(err);
});

module.exports = app;

// SOCKET CODE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//express initializes app to be a function handler 
// var app = require('express')();

// //app is supplied an HTTP server 
// var http = require('http').Server(app);

// //passing http server to socket (handles the client)
// var io = require('socket.io')(http);

//using sendFile to link to our index.html instead of having strings in this file (i.e Hello World)
// app.get('/chat', function(req, res){
//     res.sendFile(__dirname + '/client/public/index.html');
//   });

  //app.use(express.static(path.join(__dirname, '/client/public/index.html')));

// listens on the connection event for incoming sockets and sends it to everyone on the chat including sender
// io.on('connection', function(socket){
//     socket.on('chat message', function(msg){
//     io.emit('chat message', msg); 
//   });
// }); 

//to make the http server listen on port 3000 
// http.listen(3001, function(){
//   console.log('listening on *:3001');
// });


var app = require('express')();  
var server = require('http').Server(app);  
var io = require('socket.io')(server);

//using sendFile to link to our index.html instead of having strings in this file (i.e Hello World)
app.get('/chat', function(req, res){
    res.sendFile(__dirname + '/client/public/index.html');
  });

// // listens on the connection event for incoming sockets and sends it to everyone on the chat including sender
// io.on('connection', function(socket){
//     socket.on('chat message', function(msg){
//     io.emit('chat message', msg); 
//   });
// }); 

// //to make the http server listen on port 3000 
// http.listen(3001, function(){
//   console.log('listening on *:3001');
// });

io.on('connection', socket => {
  socket.on('join', name => {
      userService.addUser({
          id: socket.id,
          name
      });
      io.emit('update', {
          users: userService.getAllUsers()
      });
  });

  // socket.on('disconnect', () => {
  //     userService.removeUser(socket.id);
  //     socket.broadcast.emit('update', {
  //         users: userService.getAllUsers()
  //     });
  // });

  socket.on('message', message => {
      const {name} = userService.getUserById(socket.id);
      socket.broadcast.emit('message', {
          text: message.text,
          from: name
      });
  });

  socket.on('getUsers', () => {
      io.emit('update', {
          users: userService.getAllUsers()
      });
  });
});

// server.listen(app.get('port'), () => {
//   console.log('listening on ', app.get('port'));
// });
server.listen(3001, function(){
    console.log('listening on *:3001');
  });

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signup', signupRouter);
app.use('/login',loginRouter);
app.use('/courses',coursesRouter);


//server.listen(3001); 