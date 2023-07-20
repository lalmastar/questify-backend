const mongoose = require('mongoose');

const AnswerSchema=new mongoose.Schema({
    questionId: {type: mongoose.Schema.Types.ObjectId, ref:"Question",required: true},
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:"User",require:true},
    answer:{type:String,required:true},
    upvotes:{type:Number,default:0},
    downvotes:{type:Number,default:0},
    date:{type:Date,require:true}
})
 
module.exports=mongoose.model("Answer",AnswerSchema);