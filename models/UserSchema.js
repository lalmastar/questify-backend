const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true,unique:true },
    profession:{type:String,require:true},
    avatar:{type:String,default:""}, 
    followers:{type:Array},
    following:{type:Array},
    upvotes:{
        type:Array
    },
    downvotes:{
        type:Array
    }
});

module.exports = mongoose.model('User',UserSchema);