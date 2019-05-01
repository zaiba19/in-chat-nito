var express = require('express');
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
			//console.log("error: ",err);
		    //throw err;//result(err,null);
			//res.statusCode=404;
			res.status(404).send("Error: Username already exists.");
			
		}
		else {
						//looks for user in db
						conn.query('SELECT * FROM user_table WHERE username= ?',username,function(erro,rows){
									
						if(erro){
							res.status(404).send("Error: no user found");
						}

						if(rows.length === 0){
							res.status(404).send("Error: no user found");
						}else{
						
							res.status(200).send("New user created");
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
									console.log(error);
									res.status(404).send("Error: Could not enter default courses");
								}else{

									res.status(200).send("User Created and Default classes added");
								}
								
								
							 }); 
							//res.status(200).send(rows[0]);
							
							
							//((rows[0].userID).toString());
						
							
						}
					});
					
		}	

	});
	
	
	

});

module.exports=router;