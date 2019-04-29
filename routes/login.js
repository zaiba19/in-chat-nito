var express = require('express');
var router = express.Router();
var db= require("../models/db.js");
//var user =require('../control/appControl.js'); //Gets user functions
var mysql = require('mysql')


var conn=db;

 
router.get('/:name', function(req, res, next) {
	console.log(req.params.name);
	var username=req.params.name;
	
	conn.query('SELECT * FROM user_table WHERE username= ?',username,function(err,rows){

		//runs if err has input after select user
					
		if(err){
			//console.log("error: ",err);
		    //throw err;//result(err,null);
			//res.statusCode=404;
			res.status(404).send("Error: no user found");

		}

		if(rows.length === 0){
			//console.log("This row is empty!");
			//res.statusCode = 404;
			res.status(404).send("Error: no user found");
		}
		else{
		
			console.log(rows[0]);
			//console.log(rows[0].userID); //Outputs user ID
			res.status(200).send(rows[0]);
			
			//((rows[0].userID).toString());
		
			
		}
	});
	

});

module.exports=router;