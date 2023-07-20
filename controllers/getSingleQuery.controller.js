const Question = require("../models/QuestionSchema")
const Answer = require("../models/AnswerSchema")
const User = require("../models/UserSchema");
const getQuestNAns = require("../utils/getQuestNAns")
const logEvent = require("../utils/logErrors");

const getSingleQuery = async (req,res) =>{
    try{
        const {question_id}=req.params;
        if(!question_id) return res.status(404).json({error:"question not found"});
        const userData=await User.findById(req.body.user_id,{upvotes:1,downvotes:1});
        const result = await getQuestNAns(question_id,false,req,userData);

        return res.send(result);
    }catch(err){
        logEvent("getSingleQuery",error.message)
        return res.status(500).json({error:"Internal Server Error!!!"})
    }
}

module.exports = getSingleQuery;