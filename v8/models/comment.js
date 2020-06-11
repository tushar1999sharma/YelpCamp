var mongoose   = require("mongoose");

//Comment Schema
var commentSchema = new mongoose.Schema({
    text: String,
    author: 
        {
            id:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User" //name of model
            },
            username: String
        }
});
module.exports = mongoose.model("Comment", commentSchema);