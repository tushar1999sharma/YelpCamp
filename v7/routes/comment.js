var express         = require("express"),
    router          = express.Router(),
    campGround      = require("../models/campground"), //camGround schema
    Comment         = require("../models/comment"), //comment schema
    User            = require("../models/user"); //user Schema

router.get("/new", isLoggedIn, function(req,res){ //middleware will check if user logged in or not
    campGround.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            //console.log(campground);
            res.render("../views/comments/new.ejs",{campground: campground});
        }
    })
})

router.post("", isLoggedIn, function(req, res){ //middleware will check if user logged in or not
    campGround.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            Comment.create(req.body.comment,function(err,comment){
                if(err) {
                    console.log(err);
                }
                else {
                    campground.comments.push(comment);
                    campground.save();
                    console.log(campground);
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    })
})

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
