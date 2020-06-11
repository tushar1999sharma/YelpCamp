var express         = require("express"),
    router          = express.Router(),
    campGround      = require("../models/campground"), //camGround schema
    Comment         = require("../models/comment"), //comment schema
    User            = require("../models/user"), //user Schema
    middleware      = require("../middleware"); //only if file name is index.js

//New Comment
router.get("/:id/comments/new", middleware.isLoggedIn, function(req,res){ //middleware will check if user logged in or not
    console.log(req.params.id);
    campGround.findById(req.params.id,function(err,campground){
        if(err || !campGround){
            req.flash("error", "Campground not found");
            res.redirect("back");
            //console.log(err);
        }
        else{
            //console.log(campground);
            res.render("../views/comments/new.ejs",{campground: campground});
        }
    })
})

//Post new Comment
router.post("/:id/comments", middleware.isLoggedIn, function(req, res){ //middleware will check if user logged in or not
    campGround.findById(req.params.id,function(err,campground){
        if(err){
            //console.log(err);
        }
        else{
            Comment.create(req.body.comment,function(err,comment){
                if(err) {
                    req.flash("error", "Something went wrong");
                    console.log(err);
                }
                else {
                    //add username and id to commment object
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    console.log(comment);
                    campground.comments.push(comment);
                    campground.save();
                    console.log(campground);
                    req.flash("success", "Successfully created Comment");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    })
});

//Edit Comment
router.get("/:id/comments/:Comment_id/edit", middleware.checkCommentOwnership, function(req,res){
    //check if campground exist
    campGround.findById(req.params.id, function(err, foundcampground){
        if(err || !foundcampground){
            req.flash("error", "Campground not found");
            return resredirect("back");
            //console.log(err);
        }
        //find comment with provided id
        Comment.findById(req.params.Comment_id, function(err, foundcomment){
            if(err || !foundcomment){
                req.flash("error", "Comment not found");
                res.redirect("back");
                //console.log(err);
            }
            else{
                res.render("../views/comments/edit.ejs",{comment: foundcomment, campgroundID: req.params.id});
            }
        })
    });
});

//update data
router.put("/:id/comments/:Comment_id", middleware.checkCommentOwnership, function(req,res){
    //req.body.campground.description = req.sanitize(req.body.campground.description); //middleware allow it to sanitize before create route also
    Comment.findByIdAndUpdate(req.params.Comment_id, req.body.comment, function(err, comment){
        if(err) {
            console.log(err);
        }
        else {
            req.flash("success", "Successfull edited the Comment");
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

//delete comment
router.delete("/:id/comments/:Comment_id", middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndRemove(req.params.Comment_id,function(err){
        if(err){
            res.redirect("back");
        }
        else{
            req.flash("success", "Successfull deleted the Comment");
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
 });

module.exports = router;