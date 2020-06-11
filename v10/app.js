var express                 = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"), 
    flash                   = require("connect-flash"),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    methodOverride          = require("method-override");
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

//V10:- 1. Refactoring and UI improvement.
//      2. add background slider.
//      3. dynamic pricing  

mongoose.connect('mongodb://localhost:27017/YelpCamp_v10', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
app.use(express.static("public")); //use CSS
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());
app.set("view engine","ejs"); 
//comment seedDB, its own choice
//seedDB();

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
   res.locals.error = req.flash("error"); //error message
   res.locals.success = req.flash("success"); //success message
   next(); //to move to next middleware
});


app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds", commentRoutes);
app.use(authRoutes);

app.listen(3000, function(){
    console.log("YelpCamp server has started!");
});

#include <bits/stdc++.h>
using namespace std;

#define F first
#define S second
#define inf 1e18
#define endl "\n"
#define pb push_back
#define mod 1000000007
#define int long long int
#define all(x) x.begin(), x.end()
#define mset(a,val) memset(a,val,sizeof(a))
#define fast ios::sync_with_stdio(false);cin.tie(0)
#define precision(x,y) fixed << setprecision(y) << x
#define error(x) cout << #x << " = " << x << endl;
#define scan(arr,a,n) for(int k=(a); k<(n); k++) cin >> (arr)[k];
#define print(arr,a,n)for(int k=(a); k<(n); k++) cout << (arr)[k]<<" ";

int32_t main() 
{
    #ifdef JUDGE
    freopen("input.txt", "rt", stdin);
    #endif
    fast;

    int t;
    cin>>t;
    while(t--)
    {
        int a, b, c;
        cin >> a >> b >> c;

        int x, y, z;
        cin >> x >> y >> z;

        int diff1, diff2, diff3;
        diff1 = x - a;
        diff2 = y - b;
        diff3 = z - c;

        int ans = 3;
        if(diff1 == diff2 == diff3){
            ans = 0;
            cout << ans << endl;
            continue;
        }

        //multiple
        int tempx = x, tempy = y, tempz = z, count = 1;
        while(tempx >= 1 && tempy >= 1 && tempz >= 1)
        {
            if(x % count != 0 || y % count != 0 || z % count != 0){
                count++;
                continue;
            }
            tempx = x / count;
            tempy = y / count;
            tempz = z / count;
            cout << tempx << " " << tempy << " " << tempz << endl;

            if(tempx - a == tempy - b && tempx - a == tempy - b){
                if(tempx - a == 0){
                    ans = 1;
                }
                else ans = 2;
                break;
            }
            if(a - tempx == b - tempy && a - tempx == c - tempz){
                ans = 2;
                break;
            }
            count++;
        }
        cout << ans << endl;
    }
    return 0;
}