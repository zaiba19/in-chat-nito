//var sql = require(db.js);

//USER object contructor

var User = function(user,id) {
	this.user =user;
	this.id = id;
	
		this.getUsername=function(){
				return this.user;
		}
	/*this.getID=function(){
			return this.user;
	} */
	}

//User function to create user based off class info
/*User.createUser= function (username){
	//SQL call to check is user exists
	//newUser="shun"; //dummy
	console.log("NEwuser in createuser ",username);
	
	conn.query('SELECT username FROM user_table WHERE username= ?',username,function(err,res){
		console.log("Result: ",JSON.stringify(res));
		
		var out = JSON.stringify(res);
		//runs if err has input after select user
		if(err){
			console.log("Username does not exist",err);
				// 
				conn.query('INSERT INTO user_table(username) VALUES (?)',username,function(err,res){
					
					if(err){
						console.log("error: ",err);
						return err;//result(err,null);
					}
					else {
						console.log("USER has been added. ID: " + res);
						return res;//result(null,res.insertId);
					}
					
				});
			 
		}
		else {
			console.log("Username EXISTS",res);
			//result(null,res.insertId);
			return out;//result(out);
		}
		
	});
	
	
}; */
	
module.exports= User;