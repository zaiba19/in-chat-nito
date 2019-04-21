var express = require('express');
var mysql = require('mysql')


var connection = mysql.createConnection({
	host: 'inchatnito.caypex3thbml.us-east-1.rds.amazonaws.com',
	user: 'InchatnitoMaster',
	password:'#1Inchatnito',
	database:'inchatnito'
});

connection.connect((err)=>{
	if(err){
		console.log('Error connecting to db');
		return;
	}
	console.log('Connection extablished');

});



module.exports=connection;
//connection.end();

