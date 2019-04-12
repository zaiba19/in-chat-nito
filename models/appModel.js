var sql = require(db.js);

//USER object contructor

var User = function(user) {
	this.user =user.user;
	this.id = user.id;
	
}

User.createUser = function createUser(newUser,result)
	sql.query("SELECT userID, username FROM user_table WHERE username= ?",newUser,function(err,res){
		if(err){
			console.log("Username does not exist",err);
				sql.query("INSERT INTO user_table ? ",newUser,function(err,res){
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