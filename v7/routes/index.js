var express         = require("express"),
    router          = express.Router(),
    campGround      = require("../models/campground"), //camGround schema
    Comment         = require("../models/comment"), //comment schema
    User            = require("../models/user"); //user Schema


router.get("/",function(req,res){
    res.render("home"); 
});

module.exports = router;