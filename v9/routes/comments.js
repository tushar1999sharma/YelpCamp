var express         = require("express"),
    router          = express.Router(),
    campGround      = require("../models/campground"), //camGround schema
    Comment         = require("../models/comment"), //comment schema
    User            = require("../models/user"); //user Schema

router.get("/:id/comments/new", isLoggedIn, function(req,res){ //middleware will check if user logged in or not
    console.log(req.params.id);
    campGround.findById(req.params.id,function(err,campground){
        if(err){
            //console.log(err);
        }
        else{
            //console.log(campground);
            res.render("../views/comments/new.ejs",{campground: campground});
        }
    })
})

router.post("/:id/comments", isLoggedIn, function(req, res){ //middleware will check if user logged in or not
    campGround.findById(req.params.id,function(err,campground){
        if(err){
            //console.log(err);
        }
        else{
            Comment.create(req.body.comment,function(err,comment){
                if(err) {
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
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    })
});

//Edit Comment
router.get("/:id/comments/:Comment_id/edit", checkCommentOwnership, function(req,res){
    //find comment with provided id
    Comment.findById(req.params.Comment_id, function(err, foundcomment){
        if(err){
            //console.log(err);
        }
        else{
            res.render("../views/comments/edit.ejs",{comment: foundcomment, campgroundID: req.params.id});
        }
    })
});

//update data
router.put("/:id/comments/:Comment_id", checkCommentOwnership, function(req,res){
    //req.body.campground.description = req.sanitize(req.body.campground.description); //middleware allow it to sanitize before create route also
    Comment.findByIdAndUpdate(req.params.Comment_id, req.body.comment, function(err, comment){
        if(err) {
            console.log(err);
        }
        else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

//delete comment
router.delete("/:id/comments/:Comment_id", checkCommentOwnership, function(req,res){
    Comment.findByIdAndRemove(req.params.Comment_id,function(err){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
 });

function checkCommentOwnership(req, res, next) {
    if(req.isAuthenticated()) {
        Comment.findById(req.params.Comment_id, function (err, foundComment){
            if(err){
               res.redirect("/campgrounds");
           } else {
                 //does user own comment?
               if(foundComment.author.id.equals(req.user._id)) {
                 next();  
               } else {
                res.redirect("back");
               }
           }
        });
    } else {
        res.redirect("back");
    }
}

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;