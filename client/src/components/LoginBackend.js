var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
const PORT =process.env.PORT || 3000; //variable containing the connection port

// funtion that will make the connection to our own database
//data base information will be changed **
var connection = mysql.createConnection({
    host: 'inchatnitodb.cnjllkigqfjv.us-east-1.rds.amazonaws.com',
    user: 'InchatnitoMaster',
    password:'inchatnito',
    database:'inchatnitodb'
});

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
//funtions that will utilize the body parser library
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//funtion that will get the username 
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname +'/login')); 
});
//aunthentification funtion
app.post('/auth',function(req,res){
    var username = req.body.username;     //will only require only user name until we add a password
    //var password = req.body.password;
    if (username){ //&& password) {     //checks if the user name is found in the db
        connection.query('SELECT * FROM user_table WHERE username = ?', [username], function(error, results, fields) {  
            if (results.length > 0) {           //if correct will grand access to the page 
                req.session.loggedin = true;       
                req.session.username = username;   
                res.redirect('/user_page.js'); // will redirect to the mainpage(subject to change)
            } else {
                res.send('Wrong Username and/or Password'); // if string is 0 will give an error 
            }           
            res.end();
        });
    } else {
        res.send('Please enter Username and Password');// if not found will give an error message
        res.end();
    }
});
app.listen(PORT,()=>{      //function that listen for the page to fetch the username
    console.log(`Server is listening on port ${PORT}`);
 })

//client/src/components.js

