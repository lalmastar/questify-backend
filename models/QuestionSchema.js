const mongoose= require("mongoose")

const QuestionSchema=  new mongoose.Schema({
    question: { type: String, required: true },
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    upvotes:{type:Number,default:0},
    downvotes:{type:Number,default:0},
    date:{type:Date,required:true}
})

QuestionSchema.index({ question: "text" });

module.exports=mongoose.model("Question",QuestionSchema);