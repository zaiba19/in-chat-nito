var User = require(../models/appModel.js);

exports.create_User = function(req,res){
	var new_user= new User(req.body);
	
	//Checks is username entere otherwise error
	if(!new_user.user || !new_user.id)
	{ 
		res.status(400).send({error:true,message:'Please enter a valid user'};
	} 
	else{
		
		User.createUser(new_user, function(err,user){
			
			console.log('Controller')
			if (err)
				res.send(err)
				console.log('res',user);
			res.send(user);
		});
		
	}
	
};