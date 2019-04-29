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
	
	conn.query('INSERT INTO user_table(username) VALUES (?)',username,function(err,rows){
					
		if(err){
			//console.log("error: ",err);
		    //throw err;//result(err,null);
			//res.statusCode=404;
			res.status(404).send("Error: Username already exists.");
			
		}
		else {
			
		//	var user
		//	conn.query('INSERT INTO assign_table(userID, username) VALUES (?)',username,function(err,rows){
			
			//res.statusCode=200;
			res.status(200).send("User has been created");
		}		
	});
	

});

module.exports=router;