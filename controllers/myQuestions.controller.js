const Question = require("../models/QuestionSchema");
const User = require("../models/UserSchema");
const logEvent = require("../utils/logErrors");

const myQuestions = async (req,res)=>{
    try{
        const { user_id } = req.body
        const questions = await Question.find({user_id:user_id},{"question":1,"upvotes":1,"downvotes":1,"date":1})
        const user=await User.findById(user_id,{"upvotes":1,"downvotes":1});

        const filteredQuests = questions.map(quest=>({
            _id:quest._id,
            question:quest.question,
            upvotes:quest.upvotes,
            isupvoted:user.upvotes.includes(quest._id),
            downvotes:quest.downvotes,
            isdownvoted:user.downvotes.includes(quest._id),
            date:quest.date,
        }))

        return res.status(201).json(filteredQuests)
        
    }catch(err){
        logEvent("myQuestions",error.message)
        return res.status(500).json({error:"internal server error"})
    }
}

module.exports=myQuestions;