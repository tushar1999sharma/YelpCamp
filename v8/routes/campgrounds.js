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
            res.render("../views/campgrounds/index.ejs",{campgrounds: allCampgrounds});
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
            //console.log(newCampground);
            //redirect to index page
            res.redirect("/campgrounds");
        }
    })
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;