var express = require('express');
var router = express.Router();
var db= require("../models/db.js");

var conn=db;

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
	var userID = req.cookie;
	console.log(userID);
	conn.query('SELECT * FROM assign_table WHERE userID = ?',1, function(err,rows){
					
		if(err){
			//console.log("error: ",err);
		    //throw err;//result(err,null);
			//res.statusCode=404;
			res.status(404).send(err);
			
		}
		else {
			
			console.log(rows);
			//res.statusCode=200;
			res.status(200).send("User has been created");
		}		
	});
	
});
module.exports = router;
