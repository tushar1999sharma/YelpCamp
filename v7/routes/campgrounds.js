var express         = require("express"),
    router          = express.Router(),
    campGround      = require("../models/campground") //camGround schema

//get all campground from db
router.get("/",function(req,res){
    //get all campGround from db
    campGround.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("../views/campgrounds/index.ejs",{campgrounds: allCampgrounds});
        }
    })
});

//Form for new campground
router.get("/new",function(req,res){ 
    res.render("../views/campgrounds/new");
})

//show description
router.get("/:id",function(req,res){
    //find campground with provided id
    campGround.findById(req.params.id).populate("comments").exec(function(err, foundcampground){
        if(err){
            console.log(err);
        }
        else{
            //console.log(foundcampground);
            res.render("../views/campgrounds/show",{campground: foundcampground});
        }
    })
})

//add new campground to db
router.post("/",function(req,res){
    var newCampName = req.body.name;
    var newCampImage = req.body.image;
    var newCampDescription = req.body.description;
    var newCampground = {name: newCampName, image: newCampImage, description: newCampDescription}
    //create new campground and save it to db
    campGround.create(newCampground,function(err,newCampground){
        if(err){
            console.log(err);
        }
        else{
            console.log(newCampground);
            //redirect to index page
            res.redirect("/campgrounds");
        }
    })
});

module.exports = router;