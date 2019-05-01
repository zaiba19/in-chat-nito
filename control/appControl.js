var User = require('../models/appModel.js');
var express = require('express');
var router = express.Router();
//var db = require('../models/db.js');
//var mysql = require('mysql');
//Control runs scripts to create user and checks response and sends errors
//ADDEDDD
var mysql = require('mysql')


var conn = mysql.createConnection({
	host: 'inchatnito.caypex3thbml.us-east-1.rds.amazonaws.com',
	port: '3306',
	user: 'InchatnitoMaster',
	password:'#1Inchatnito',
	database:'inchatnito'
});

conn.connect((err)=>{
	if(err){
		console.log('Error connecting to db in Model');
		return;
	}
	console.log('Connection established in controller');

}); 
//END OF ADDDED

//create user function
var output=null;
exports.findUser = function(user){
	//new_user is a new instance of the class USER. 
    // initialize a var with user type with the username requested and an ID of 0. 
	console.log('Controller calling usercreate');
	var newUser= new User(user,0);
	var user= newUser.getUsername();
	console.log(newUser.getUsername());
	output=conn.query('SELECT username FROM user_table WHERE username= ?',user,function(err,rows){

		//runs if err has input after select user
		if(err){
			err;
			throw err;
			
			/*
			console.log("Username does not exist",err);
				// 
				conn.query('INSERT INTO user_table(username) VALUES (?)',user,function(err,row){
					
					if(err){
						console.log("error: ",err);
						throw(err);//result(err,null);
					}
					else {
						console.log("USER has been added. ID: ");
						//result(null,res.insertId);
					}
					
				}); */
			 
		}
		else {
			console.log("Username EXISTS");
			//result(null,res.insertId);
			//return out;//result(out)
			rows.forEach( (row) => {
				console.log(JSON.stringify(row));
			});

		}
		
	}); 
	return output;
	//return out;
	//console.log(user);
	//Runs user objct function to create the user in appModel.js
	//var out = new_user.createUser(user);
	//console.log("Out: ", out);
	/*function(err,res){
			//console.log("Request: ", req);
			console.log("Result: ", res);
			
			
			console.log('Controller');
			
			if (err){
				console.log("Error in create_User ",err);
				return err;//res.send(err);
			}else{
				console.log("Result in create_User ", res);
				console.log("No Errors running createUser");
				return JSON.stringify(res);
			}
			
	});		 *//////
	
	//Checks is username exists otherwise error
	/*if(!new_user.user || !new_user.id)
	{ 
		console.log('Please enter a valid user');
	} 
	else{
		
		User.createUser(new_user, function(err,user){
			
			console.log('Controller');
			if (err)
				res.send(err)
				console.log('res',user);
			res.send(user);
		});
		
	} */
	
};

exports.createUser = function(user){
	//new_user is a new instance of the class USER. 
    // initialize a var with user type with the username requested and an ID of 0. 
	console.log('Controller calling usercreate');
	var newUser= new User(user,0);
	var user= newUser.getUsername();
	console.log(newUser.getUsername());
	
	output=conn.query('INSERT INTO user_table(username) VALUES (?)',user,function(err,rows){
					
		if(err){
			console.log("error: ",err);
			out=err;
		    throw err;//result(err,null);
			
		}
		else {
			console.log("USER has been added. ID: ");
			rows.forEach( (row) => {
				console.log(`${row.name} is in ${row.location}`);
			});
			output=rows;
			//result(null,res.insertId);
			}
					
	});
			 
	return output;
	
};

module.exports=exports;

