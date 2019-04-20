//var sql = require(db.js);
var mysql = require('mysql')


var conn = mysql.createConnection({
	host: 'inchatnitodb.cnjllkigqfjv.us-east-1.rds.amazonaws.com',
	user: 'InchatnitoMaster',
	password:'inchatnito',
	database:'inchatnitodb'
});

/*conn.connect((err)=>{
	if(err){
		console.log('Error connecting to db');
		return;
	}
	console.log('Connection extablished');

}); */

//USER object contructor

var User = function(user,id) {
	this.user =user;
	this.id = id;
	
}

//User function to create user
User.createUser = function createUser(newUser,result){
	//SQL call to check is user exists
	//newUser="shun"; //dummy
	
	conn.query("SELECT userID, username FROM user_table WHERE username= ?",newUser,function(err,res){
		//runs if err has input after select user
		if(err){
			console.log("Username does not exist",err);
				// 
				sql.query("INSERT INTO user_table ?",newUser,function(err,res){
					if(err){
						console.log("error: ",err);
						result(err,null);
					}
					else {
						console.log(res.userID);
						result(null,res.insertId);
					}
					
				});
			 
		}
		else {
			console.log("Username EXISTS",res.userID);
			result(null,res.insertId);
		}
		
	});
	
	
};
	
module.exports=User;