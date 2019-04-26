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
module.exports = router;
