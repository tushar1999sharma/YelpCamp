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
            req.flash("error", err.message); //this will display the reason of error
            //console.log(err);
            //res.redirect("/register");
        }
        else{
            passport.authenticate("local")(req, res, function(){
                //console.log(newUser);
                req.flash("success", "Welcome to YelpCamp " + user.username);
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
    successFlash: "Successfully Logged in",
    failureRedirect: "/login",
    failureFlash: true
}), function(req,res){
    console.log("User logged in");
})

router.get("/logout",function(req,res){
    req.flash("success", "Successfully Logged Out");
    req.logOut();
    res.redirect("/");
})

module.exports = router;