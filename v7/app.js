var express                 = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    campGround              = require("./models/campground"), //camGround schema
    Comment                 = require("./models/comment"), //comment schema
    User                    = require("./models/user"),
    seedDB                  = require("./seeds");

//REQUIRING ROUTES    
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index"),
    authRoutes       = require("./routes/authentication")

mongoose.connect('mongodb://localhost:27017/YelpCamp_v7', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(express.static("public")); //use CSS
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
seedDB();
// seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Tushar Sharma is the best",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); //passport authenticate middleware
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next(); //to move to next middleware
});


app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds", commentRoutes);
app.use(authRoutes);

app.listen(3000, function(){
    console.log("YelpCamp server has started!");
});