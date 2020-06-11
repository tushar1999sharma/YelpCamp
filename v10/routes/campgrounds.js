var express         = require("express"),
    router          = express.Router(),
    campGround      = require("../models/campground"), //camGround schema
    Comment         = require("../models/comment"), //comment schema
    middleware      = require("../middleware"); //only if file name is index.js 
    
//get all campground from db
router.get("/",function(req,res){
    //get all campGround from db
    campGround.find({},function(err,allCampgrounds){ //find all campground
        if(err){
            //console.log(err);
        }
        else{
            res.render("../views/campgrounds/index.ejs",{campgrounds: allCampgrounds, currUser: req.user});
        }
    })
});

//Form for new campground
router.get("/new", function(req,res){ 
    res.render("../views/campgrounds/new.ejs");
});

//add new campground to db
router.post("/", middleware.isLoggedIn, function(req,res){
    var newCampName = req.body.name; 
    var newCampImage = req.body.image;
    var newCampPrice = req.body.price;
    var newCampDescription = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: newCampName, image: newCampImage, price: newCampPrice, description: newCampDescription, author: author}
    //create new campground and save it to db
    campGround.create(newCampground,function(err,newCampground){
        if(err){
            //console.log(err);
        }
        else{
            console.log("NEW CAMPGROUND");
            console.log(newCampground);
            //redirect to index page
            req.flash("success", "Successfully created Campground");
            res.redirect("/campgrounds");
        }
    });
});

//show description
router.get("/:id",function(req,res){
    //find campground with provided id
    campGround.findById(req.params.id).populate("comments").exec(function(err, foundcampground){
        if(err || !foundcampground){
            req.flash("error", "Campground not found");
            res.redirect("back");
            console.log(err);
        }
        else{
            //console.log(foundcampground);
            res.render("../views/campgrounds/show",{campground: foundcampground});
        }
    })
});

//Edit CampGround
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
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
});

//update data
router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
    //req.body.campground.description = req.sanitize(req.body.campground.description); //middleware allow it to sanitize before create route also
    campGround.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
        if(err) {
            console.log(err);
        }
        else {
            console.log(req.params.id);
            req.flash("success", "Successfull edited the Campground");
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

//Delete Campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    campGround.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            console.log(err);
        }
        else {
            req.flash("success", "Successfull deleted the Campground");
            res.redirect("/campgrounds/");  
        }
    })
});

module.exports = router;