var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");
    seedDB     = require("./seeds");
    campGround = require("./models/campground"); //camGround schema

mongoose.connect('mongodb://localhost:27017/YelpCamp_v3', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

seedDB();

app.listen(3000,function(){
    console.log("YelpCamp Server has started");
});

//home page
app.get("/",function(req,res){
    res.render("home"); 
});

//get all campground from db
app.get("/campgrounds",function(req,res){
    //get all campGround from db
    campGround.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("index",{campgrounds: allCampgrounds});
        }
    })
});

//Form for new campground
app.get("/campgrounds/new",function(req,res){ 
    res.render("new");
})

//show description
app.get("/campgrounds/:id",function(req,res){
    //find campground with provided id
    campGround.findById(req.params.id).populate("comments").exec(function(err, foundcampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("show",{campground: foundcampground});
        }
    })
})

//add new campground to db
app.post("/campgrounds",function(req,res){
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