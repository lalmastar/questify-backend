const Answer = require("../models/AnswerSchema");
const logEvent = require("../utils/logErrors");

const addAnswer = async (req, res) => {
  try {
    const question_id = req.params.question_id;
    const { user_id, answer } = req.body; 

    if (!answer) return res.status(409).json({ error: "Enter valid answer" });

    const resAnswer = Answer.create({
      questionId:question_id,
      user_id,
      answer,
      date:new Date(Date.now()),
      upvotes: 0,
      downvotes: 0,
    });

    if (resAnswer) {
      return res.status(201).json({ success: "answer is added successfully" });
    } else {
      return res
        .status(500)
        .json({ error: "Unexpected error. Answer creation failed." });
    }
  } catch (error) {
    logEvent("addAnswer",error.message)
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

module.exports = addAnswer;


