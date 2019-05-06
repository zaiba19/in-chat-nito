var express = require('express');
var router = express.Router();
var db= require("../db.js");
//var user =require('../control/appControl.js'); //Gets user functions
var mysql = require('mysql')


var conn=db;

 
router.get('/', function(req, res, next) {

	if(req.cookies==null)
	{
		console.log("Error"+err);
		res.status(404).send("No User logged in");
	} else{

	res.status(200).send(JSON.stringify(req.cookies));
	}
	

});

module.exports=router;