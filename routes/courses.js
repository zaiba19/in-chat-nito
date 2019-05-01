var express = require('express');
var router = express.Router();
var db= require("../db.js");
var async= require("async");

var conn=db;

/* GET default courses listing. */
// router.get('/', function(req, res, next) {

// 	res.json([{
//         id:1,
// 		name:"Web Development"
// 	},{
// 		id:2,
// 		name:"Computer Architecture"
// 	},{
// 		id:3,
// 		name:"Spanish"
// 	},{
// 		id:4,
// 		name:"Game Design"
// 	},{
// 		id:5,
// 		name:"Music History"
// 	}]);
// }); 

router.get('/', function(req, res, next) {

	console.log(req.params.name);
	var userID =req.cookies.userID; //req.cookie.userID;
	console.log(userID);
	
	//Looks for all courses user is assigned to
	conn.query("SELECT assign_table.courseID, course_table.courseID ,course_table.courseName FROM assign_table RIGHT JOIN course_table ON assign_table.courseID = course_table.courseID WHERE assign_table.userID = ?",userID, function(err,rows){
		if(err){
			//console.log("error: ",err);
		    //throw err;//result(err,null);
			//res.statusCode=404;
			res.status(404).send("Error: no courses found");
			
		} else{
			console.log(JSON.stringify(rows));
			res.status(200).send(JSON.stringify(rows));
			
		}
		
	});
	
	
});
module.exports = router;
