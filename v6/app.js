var express                 = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    session                 = require("express-session");
    campGround              = require("./models/campground"), //camGround schema
    Comment                 = require("./models/comment"), //comment schema
    User                    = require("./models/user"),
    seedDB                  = require("./seeds");

mongoose.connect('mongodb://localhost:27017/YelpCamp_v6', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(express.static("public")); //use CSS
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
seedDB();

//Passport Configuration
app.use(session({
    secret: "Tushar Sharma is the best",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//------------------------------------------------
//                 Functions
//------------------------------------------------

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

//------------------------------------------------
//                  Listen
//------------------------------------------------

app.listen(3000,function(){
    console.log("YelpCamp Server has started");
});

//------------------------------------------------
//             HomePage Routes
//------------------------------------------------

app.get("/",function(req,res){
    res.render("home"); 
});

//------------------------------------------------
//             CampGround Routes
//------------------------------------------------

//get all campground from db
app.get("/campgrounds",function(req,res){
    //get all campGround from db
    campGround.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index.ejs",{campgrounds: allCampgrounds});
        }
    })
});

//Form for new campground
app.get("/campgrounds/new",function(req,res){ 
    res.render("campgrounds/new");
    
})

//show description
app.get("/campgrounds/:id",function(req,res){
    //find campground with provided id
    campGround.findById(req.params.id).populate("comments").exec(function(err, foundcampground){
        if(err){
            console.log(err);
        }
        else{
            //console.log(foundcampground);
            res.render("campgrounds/show",{campground: foundcampground});
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

//--------------------------------------------
//            COMMENT ROUTE
//--------------------------------------------

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req,res){ //middleware will check if user logged in or not
    campGround.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            //console.log(campground);
            res.render("comments/new",{campground: campground});
        }
    })
})

app.post("/campgrounds/:id/comments", isLoggedIn,function(req, res){ //middleware will check if user logged in or not
    campGround.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            Comment.create(req.body.comment,function(err,comment){
                if(err) {
                    console.log(err);
                }
                else {
                    campground.comments.push(comment);
                    campground.save();
                    console.log(campground);
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    })
})

//------------------------------------------------
//            AUTHENTICATIONN ROUTE
//------------------------------------------------

app.get("/register", function(req,res){
    res.render("authentication/register");
})

app.post("/register",function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password,function(err,user){
        if(err){
            console.log(err);
            res.redirect("/register");
        }
        else{
            passport.authenticate("local")(req, res, function(){
                console.log(newUser);
                res.redirect("/campgrounds");
            })
        }
    });
});

app.get("/login",function(req,res){
    res.render("authentication/login");
})

app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req,res){
    console.log("User logged in");
})

app.get("/logout",function(req,res){
    req.logOut();
    res.redirect("/");
})