var campGround = require("../models/campground");
var Comment = require("../models/comment");

//All middlewrae obj
var middlewareObj = {};

middlewareObj.isLoggedIn = function (req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in first"); //Key - Value pair
    res.redirect("/login");
}

middlewareObj.checkCampgroundOwnership = function (req, res, next) {
    if(req.isAuthenticated()) {
        campGround.findById(req.params.id, function (err, foundCampground){
            if(err || !foundCampground){
                console.log(err);
                req.flash("error", "Campground not found");
                res.redirect("/campgrounds");
            } else {
                 //does user own campground?
                if(foundCampground.author.id.equals(req.user._id))  {
                    next();  
                } else {
                    req.flash("error", "You did not have access to that page");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in first");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function (req, res, next) {
    if(req.isAuthenticated()) {
        Comment.findById(req.params.Comment_id, function (err, foundComment){
            if(err || !foundComment){
                req.flash("error", "Comment not found");
                res.redirect("/campgrounds");
            } else {
                //does user own comment?
                if(foundComment.author.id.equals(req.user._id)) {
                 next();  
                } else {
                    req.flash("error", "You did not have access to that page");
                    res.redirect("back");
                }
           }
        });
    } else {
        req.flash("error", "You need to be logged in first");
        res.redirect("back");
    }
}

module.exports = middlewareObj;