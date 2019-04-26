var express = require('express');
var router = express.Router();
var db= require("../models/db.js");
//var user =require('../control/appControl.js'); //Gets user functions
var mysql = require('mysql')


var conn=db;

 
router.get('/:name', function(req, res, next) {
	console.log(req.params.name);
	var username=req.params.name;
	
	conn.query('SELECT username FROM user_table WHERE username= ?',username,function(err,rows){

		//runs if err has input after select user
					
		// if(err){
		// 	//console.log("error: ",err);
		//     //throw err;//result(err,null);
		// 	res.send("Error: no user found");
			
		// }
		// else {
			
		// 	console.log(rows);
		// 	res.send(rows);
		// }		


		if(rows.length === 0){
			//console.log("This row is empty!");
			res.statusCode = 404;
			res.send("Error: no user found");
		}
		else{
			res.statusCode = 200;
			res.send("User has been found");
		}
	});
	

});

module.exports=router;