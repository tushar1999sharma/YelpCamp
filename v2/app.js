var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");

mongoose.connect('mongodb://localhost:27017/YelpCamp_v2', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

//CampGround Schema
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});
var campGround = mongoose.model("CampGround",campgroundSchema);

/* campGround.create(
    {
        name: "Car Camping",
        image: "https://www.survivaltechshop.com/wp-content/uploads/2019/05/car-camping.jpg",
        description: 'There is a lot of people out there who want to go camping, but do not think they have the gear or all the right stuff to go. The truth is you do not need a whole bunch of stuff, you only need a few things and you probably already have several of them. Car camping is the perfect solution as you can use whatever you already have at home. Many hatchback cars work perfect for this by folding down the seats for more room inside. Lay down a sleeping pad or some blankets for cushioning, and you have got yourself an area to sleep. It is not the most glamorous form of camping, yet it is simple and easy to do. If you are on a low budget or want to try out camping for the first time, car camping can be a great option for you.'
    }, function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            console.log(campground);
        }
    }
) */ 

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
    campGround.findById(req.params.id, function(err, foundcampground){
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