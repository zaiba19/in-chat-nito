var express = require('express');
var router = express.Router();
var user =require('../control/appControl.js'); //Gets user functions

router.get('/:name', function(req, res, next) {
	console.log(req.params.name);
	console.log("Create User Response: " + user.create_User(req.params.name));
	res.status(200).send("You are in signup!");
});

module.exports=router;