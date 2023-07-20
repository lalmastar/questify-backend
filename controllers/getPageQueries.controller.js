const Question = require("../models/QuestionSchema")
const User = require("../models/UserSchema");
const logEvent = require("../utils/logErrors");

const getQuestNAns = require("../utils/getQuestNAns.js")

const getPageQueries = async (req,res) =>{
    try{

        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip=(page-1)*limit;
        const userData=await User.findById(req.body.user_id,{upvotes:1,downvotes:1});
        const questions = await Question.find({},{"_id":1}).sort({date: -1}).skip(skip).limit(limit).exec();
        
        const countQuestion = await Question.countDocuments();
        
        let allQuestNAns =  {questions:[]}
        
        for(let quest of questions){
            let qNa = await getQuestNAns(quest._id,true,req,userData);
            allQuestNAns.questions.push(qNa.question);
        }
        
        allQuestNAns.questionsCount=countQuestion
        
        return res.status(201).json(allQuestNAns);
    }catch(error){
        logEvent("getPageQueries",error.message)
        return res.status(500).json({error:"internal server error"})
    }
        
}

module.exports =getPageQueries;