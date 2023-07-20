const Answers = require("../models/AnswerSchema");
const User = require("../models/UserSchema");
const logEvent = require("../utils/logErrors");

const myAnswers=async (req,res)=>{
    try{
        const {user_id} = req.body;
        let allAnswers = await Answers.find({user_id:user_id},{"answer":1,"upvotes":1,"downvotes":1,"date":1}).populate("questionId","question").exec();
        const user=await User.findById(user_id,{"upvotes":1,"downvotes":1});
        allAnswers=allAnswers.map(answer=>({
            _id:answer._id,
            answer:answer.answer,
            date:answer.date,
            upvotes:answer.upvotes,
            isupvoted:user.upvotes.includes(answer._id),
            downvotes:answer.downvotes,
            isdownvoted:user.downvotes.includes(answer._id),
            questionId:answer.questionId,
        }))
        return res.status(201).json(allAnswers)
    }catch(err){
        logEvent("myAnswers",error.message);
        return res.status(500).json({error:"internal server error"})
    }
}

module.exports=myAnswers;