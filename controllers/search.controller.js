const filterKeywords = require("../utils/filterKeywords")
const Question  = require("../models/QuestionSchema")
const getQuestNAns = require("../utils/getQuestNAns")
const User = require("../models/UserSchema");
const logEvent = require("../utils/logErrors");

const search = async (req,res) =>{
    try{

        const {q} = req.query;
        if(!q) return res.status(404).json({error:"enter valid question"})
        
        const words = await filterKeywords(q);
        
        const searchQuery = words.join(" ");
        
        const questions = await Question.find({ $text: { $search: searchQuery } },{"_id":1})
        
        const userData=await User.findById(req.body.user_id,{upvotes:1,downvotes:1});
        
        let allQuestNAns =  {questions:[]}
        
        for(let quest of questions){
            let qNa = await getQuestNAns(quest._id,true,req,userData);
            allQuestNAns.questions.push(qNa.question);
        }
        
        allQuestNAns.questionsCount=questions.length;
        
        return res.status(201).json(allQuestNAns);
    }catch(error){
        logEvent("search",error.message)
        return res.status(500).json({error:"internal server error"});
    }

}

module.exports =search