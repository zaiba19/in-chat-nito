var express = require('express');
var session = require('express-session');
var router = express.Router();
var db= require('../db.js');
//var user =require('../control/appControl.js'); //Gets user functions
var mysql = require('mysql')


var conn=db;


router.get('/:name', function(req, res, next) {
	//console.log(req.body);
	console.log(req.params.name);
	var username=req.params.name;
	
	conn.query('INSERT INTO user_table(username) VALUES (?)',username,function(err,rows){
					
		if(err){
			console.log("error: ",err);
			res.status(404).send("Username Already Exists.");
			
		}
		else {
						//looks for user in db to ensure it doesn't exist
						conn.query('SELECT * FROM user_table WHERE username= ?',username,function(erro,rows){
									
						if(erro){
							res.status(404).send("User not found");
						}

						if(rows.length === 0){
							res.status(404).send("User not found");
						}else{
							res.cookie('userID', (rows[0].userID).toString());
           	  res.cookie('username',(rows[0].username).toString());
							//res.status(200).send("New User Created");
							console.log(rows[0]);
							//console.log(rows[0].userID); //Outputs user ID
							//Default courses to be inserted
							let defaultCourses= [
							  [rows[0].userID, 1],
							  [rows[0].userID, 2],
							  [rows[0].userID, 3],
							  [rows[0].userID, 4]
							];
							
							//Query to insert defualt courses with userID.
							conn.query(`INSERT INTO assign_table(userID,courseID) VALUES ? `,[defaultCourses],function(error,result){
							if(error){
									console.log("Error:" + error);
									res.status(404).send("Error: Could not enter default courses");
								}else{

									res.status(200).send("User Created and Default Classes Added");
								}
								
								
							 }); 
						
							
						}
					});
					
		}	

	});
	
	
	

});

module.exports=router;