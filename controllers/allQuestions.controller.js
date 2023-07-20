const Question = require("../models/QuestionSchema");
const logEvent = require("../utils/logErrors");

const allQuestions=async (req,res) =>{
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        let skip=(page-1)*limit
        let allQuests =await Question.find({}, {"question": 1, "_id": 1}).skip(skip).limit(limit).exec()


        if (allQuests.length) {
          res.status(200).json(allQuests);
        } else {
          res.status(404).json({ error: "No questions found" });
        }
      } catch (error) {
        logEvent("allQuestions",error.message)
        res.status(500).json({ error: "Internal Server Error Failed !!!" });
      }
}

module.exports=allQuestions;