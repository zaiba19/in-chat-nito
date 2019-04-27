var express = require('express');
var router = express.Router();

/* GET default courses listing. */
router.get('/', function(req, res, next) {

	res.json([{
        id:1,
		name:"Web Development"
	},{
		id:2,
		name:"Computer Architecture"
	},{
		id:3,
		name:"Spanish"
	},{
		id:4,
		name:"Game Design"
	},{
		id:5,
		name:"Music History"
	}]);
});

router.get('/:name', function(req, res, next) {

	console.log(req.params.name);
	var course=req.params.name;
	
	conn.query('INSERT INTO user_table(username) VALUES (?)',username,function(err,rows){
					
		if(err){
			//console.log("error: ",err);
		    //throw err;//result(err,null);
			res.statusCode=404;
			res.send("Error: Username already exists.");
			
		}
		else {
			
			console.log(rows);
			res.statusCode=200;
			res.send("User has been created");
		}		
	});
	
});
module.exports = router;
