var express = require('express');
var router = express.Router();
var db= require("../models/db.js");
//var user =require('../control/appControl.js'); //Gets user functions
var mysql = require('mysql')


var conn=db;


router.get('/:name', function(req, res, next) {
	//console.log(req.body);
	console.log(req.params.name);
	var username=req.params.name;
	
	conn.query('INSERT INTO user_table(userID, username) VALUES (?)',username,function(err,rows){
					
		if(err){
			//console.log("error: ",err);
		    //throw err;//result(err,null);
			res.statusCode=404;
			res.send("Error: Username already exists.");
			
		}
		else {
			
			console.log(rows);
			res.statusCode=200;
			res.send("User has been created");
		}		
	});
	

});

module.exports=router;