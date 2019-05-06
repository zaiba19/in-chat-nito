var express = require('express');
var router = express.Router();
var db= require("../db.js");
//var user =require('../control/appControl.js'); //Gets user functions
var mysql = require('mysql')


var conn=db;

 
router.post('/', function(req, res, next) {

	if(req==null)
	{
		console.log("Error"+err);
		res.status(404).send("Req is empty");
	} else{
	
	res.status(200).send("POst chat is good");
	}
	

});

router.get('/', function(req, res, next) {

	if(req==null)
	{
		console.log("Error"+err);
		res.status(404).send("Req is empty");
	} else{

	res.status(200).send("GET chat is good");
	}
	

});


module.exports=router;