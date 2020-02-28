var express         = require("express"),
    router          = express.Router(),
    passport        = require("passport"),
    campGround      = require("../models/campground"), //camGround schema
    Comment         = require("../models/comment"), //comment schema
    User            = require("../models/user"); //user Schema


router.get("/register", function(req,res){
    res.render("../views/authentication/register.ejs");
})

router.post("/register",function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password,function(err,user){
        if(err){
            console.log(err);
            res.redirect("/register");
        }
        else{
            passport.authenticate("local")(req, res, function(){
                console.log(newUser);
                res.redirect("/campgrounds");
            })
        }
    });
});

router.get("/login",function(req,res){
    res.render("../views/authentication/login");
})

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req,res){
    console.log("User logged in");
})

router.get("/logout",function(req,res){
    req.logOut();
    res.redirect("/");
})

module.exports = router;