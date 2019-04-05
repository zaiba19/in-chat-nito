var mysql = require('mysql')
var connection = mysql.createConnection({
	host: 'inchatnitodb.cnjllkigqfjv.us-east-1.rds.amazonaws.com',
	user: 'InchatnitoMaster',
	password:'inchatnito',
	database:'inchatnitodb'
});

connection.connect((err)=>{
	if(err){
		console.log('Error connecting to db');
		return;
	}
	console.log('Connection extablished');




});

connection.end();
