var express = require('express');
var mysql = require('mysql')


var connection = mysql.createConnection({
	host: 'inchatnito.caypex3thbml.us-east-1.rds.amazonaws.com',
	port: '3306',
	user: 'InchatnitoMaster',
	password:'#1Inchatnito',
	database:'inchatnito',
	connectTimeout: 60000
});

connection.connect((err)=>{
	if(err){
		console.log('Error connecting to db');
		return;
	} else {
	console.log('Connection extablished');
	}

});



module.exports=connection;
//connection.end();

