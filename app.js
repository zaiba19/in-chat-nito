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



const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server); 


const UsersService = require('./UsersService')
const userService = new UsersService(); 

//DATABASE

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


server.listen(3001, function(){
  console.log('listening on *:3001');
});


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
app.use('/logout',logoutRouter);
app.use('/cookies',cookieRouter);

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
  res.json({
    message: err.message,
    error: err
    });
  //res.send('error');
  console.log(err);
});



// SOCKET CODE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


//using sendFile to link to our index.html instead of having strings in this file (i.e Hello World)
app.get('/chat', function(req, res){
    res.sendFile(__dirname + '/client/public/index.html');
  });


io.on('connection', socket => {
  socket.on('join', (courseID , name) => {
    socket.room=courseID;
    const temp =new UsersService();
    temp.room=socket.room;
    console.log(temp.room);
      userService['room']=temp ;
      //userService[socket.room]= new UsersService();
      userService[socket.room].addUser({
          id: socket.id,
          name
      });
       
      socket.join(courseID);
       console.log("Name: "+ name+" Room: " +socket.room);

      io.emit('update', {
          users: userService[socket.room].getAllUsers()
      });
  });

//need a factory to create a singleton 


  socket.on('disconnect', () => {
      userService[socket.room].removeUser(socket.id);
      io.to(socket.room).emit('update', {
          users: userService[socket.room].getAllUsers()
      });
  });

  socket.on('message', message => {
      const {name} = userService[socket.room].getUserById(socket.id);
     console.log("Name:"+name+" RoomID: "+socket.room);
      io.to(socket.room).emit('message', {
          text: message.text,
          from: name
      });
  });

  socket.on('getUsers', () => {
      io.emit('update', {
          users: userService[socket.room].getAllUsers()
      });
  });
});



module.exports = app;