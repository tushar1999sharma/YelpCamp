var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

var campgrounds = [
    {name: "Tent Camping", image: "https://www.survivaltechshop.com/wp-content/uploads/2019/05/tent-camping-1.jpg"},
    {name: "RV or Van Camping", image: "https://www.survivaltechshop.com/wp-content/uploads/2019/05/rv-camping-1.jpg"}, 
    {name: "Backpacking", image: "https://www.survivaltechshop.com/wp-content/uploads/2019/05/backpacking-camping.jpg"},
    {name: "Survival Camping", image: "https://www.survivaltechshop.com/wp-content/uploads/2019/05/survival-camping-1.jpg"},
    {name:"Car Camping", image: "https://www.survivaltechshop.com/wp-content/uploads/2019/05/car-camping.jpg"},
    {name:"Primitive Camping", image: "https://www.survivaltechshop.com/wp-content/uploads/2019/05/primitive-camping-1.jpg"}
]


app.listen(3000,function(){
    console.log("YelpCamp Server has started");
});


app.get("/",function(req,res){
    res.render("home"); 
});

app.get("/campgrounds",function(req,res){
    res.render("index",{campgrounds: campgrounds});
});

app.get("/campgrounds/new",function(req,res){ 
    res.render("new");
})

app.post("/campgrounds",function(req,res){
    var newCampName = req.body.name;
    var newCampImage = req.body.image;
    var newCamp = {name: newCampName, image: newCampImage}
    campgrounds.push(newCamp);
    res.redirect("/campgrounds");
});