var mongoose   = require("mongoose");

//CampGround Schema
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Comment" //name of model
        }
     ]
});
module.exports = mongoose.model("CampGround",campgroundSchema);