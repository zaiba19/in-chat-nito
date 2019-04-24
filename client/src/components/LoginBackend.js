var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
const PORT =process.env.PORT || 3000;


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
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname +'/login'));
});

app.post('/auth',function(req,res){
    var username = req.body.username;
    //var password = req.body.password;
    if (username){ //&& password) {
        connection.query('SELECT * FROM user_table WHERE username = ?', [username], function(error, results, fields) {
            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect('/user_page.js');
            } else {
                res.send('Wrong Username and/or Password');
            }           
            res.end();
        });
    } else {
        res.send('Please enter Username and Password');
        res.end();
    }
});
app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
 })

//client/src/components.js

