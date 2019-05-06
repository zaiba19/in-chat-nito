var express = require('express');
var router = express.Router();
var db= require("../db.js");
//var user =require('../control/appControl.js'); //Gets user functions
var mysql = require('mysql')


var conn=db;

 
router.get('/', function(req, res, next) { //Componentwillmount

	if(req.cookies==null)
	{
		console.log("Error"+err);
		res.status(404).send("No User logged in");
	} else{

	res.status(200).send(JSON.stringify(req.cookies));
	}
	res.cookie('username',(rows[0].username).toString());

});
router.post('/:name', function(req, res, next) { //where join room starts

	var room=req.params.name;
	res.cookie('chatroom',room);
	if(room==null)
	{
		console.log("No room given");
		res.status(404).send("No room given");
	} else{

		res.status(200).send("Room added to cookies");
	}


});
module.exports=router;