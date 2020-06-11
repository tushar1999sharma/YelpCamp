var express         = require("express"),
    router          = express.Router(),
    campGround      = require("../models/campground") //camGround schema
    Comment         = require("../models/comment"), //comment schema
    
//get all campground from db
router.get("/",function(req,res){
    //get all campGround from db
    campGround.find({},function(err,allCampgrounds){
        if(err){
            //console.log(err);
        }
        else{
            res.render("../views/campgrounds/index.ejs",{campgrounds: allCampgrounds, currUser: req.user});
        }
    })
});

//Form for new campground
router.get("/new", isLoggedIn, function(req,res){ 
    res.render("../views/campgrounds/new");
})

//show description
router.get("/:id",function(req,res){
    //find campground with provided id
    campGround.findById(req.params.id).populate("comments").exec(function(err, foundcampground){
        if(err){
            //console.log(err);
        }
        else{
            //console.log(foundcampground);
            res.render("../views/campgrounds/show",{campground: foundcampground});
        }
    })
})

//add new campground to db
router.post("/", isLoggedIn, function(req,res){
    var newCampName = req.body.name;
    var newCampImage = req.body.image;
    var newCampDescription = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: newCampName, image: newCampImage, description: newCampDescription, author: author}
    //create new campground and save it to db
    campGround.create(newCampground,function(err,newCampground){
        if(err){
            //console.log(err);
        }
        else{
            console.log("NEW CAMPGROUND");
            console.log(newCampground);
            //redirect to index page
            res.redirect("/campgrounds");
        }
    })
});

//Edit CampGround
router.get("/:id/edit", checkCampgroundOwnership, function(req,res){
    //find campground with provided id
    campGround.findById(req.params.id, function(err, foundcampground){
        if(err){
            //console.log(err);
        }
        else{
            //console.log(foundcampground);
            res.render("../views/campgrounds/edit.ejs",{campground: foundcampground});
        }
    })
})

//update data
router.put("/:id", checkCampgroundOwnership, function(req,res){
    //req.body.campground.description = req.sanitize(req.body.campground.description); //middleware allow it to sanitize before create route also
    campGround.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
        if(err) {
            console.log(err);
        }
        else {
            console.log(req.params.id);
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

//Delete Campground
router.delete("/:id", checkCampgroundOwnership, function(req, res){
    campGround.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            console.log(err);
        }
        else {
            res.redirect("/campgrounds/");  
        }
    })
})

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

function checkCampgroundOwnership(req, res, next) {
    if(req.isAuthenticated()) {
        campGround.findById(req.params.id, function (err, foundCampground){
            if(err){
                console.log(err);
                res.redirect("/campgrounds");
            } else {
                 //does user own campground?
                if(foundCampground.author.id.equals(req.user._id))  {
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

module.exports = router;