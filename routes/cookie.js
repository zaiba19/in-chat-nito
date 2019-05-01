var express = require('express');
var router = express.Router();
var db= require("../db.js");
//var user =require('../control/appControl.js'); //Gets user functions
var mysql = require('mysql')


var conn=db;

 
router.get('/', function(req, res, next) {

	res.status(200).send(req.cookies);

	

});

module.exports=router;