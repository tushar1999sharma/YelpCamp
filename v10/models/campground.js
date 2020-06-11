var mongoose   = require("mongoose");

//CampGround Schema
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: String,
    description: String,
    comments: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Comment" //name of model
        }
    ],
    author: 
    {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User" //name of model
        },
        username: String
    }
});

module.exports = mongoose.model("CampGround",campgroundSchema);