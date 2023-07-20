const Question = require("../models/QuestionSchema");
const User = require("../models/UserSchema")
const logEvent = require("../utils/logErrors");

const downvoteQuestion = async (req, res) => {
  try {
    let downvoted=false;
    const question_id = req.params.question_id;
    if (!question_id) {
      return res
        .status(400)
        .json({downvoted, error: "Bad Request: Missing or invalid question ID" });
    }

    const user = await User.findById(req.body.user_id);
    if (!user) {
      return res.status(404).json({downvoted, error: "User not found" });
    }

    if (user.downvotes.includes(question_id)) {
      user.downvotes=user.downvotes.filter(ele=>ele!==question_id)
      await user.save();
      await Question.findByIdAndUpdate(
        question_id,
        { $inc: { downvotes: -1 } },
        { new: true }
      );
    return res.status(200).json({downvoted, success: "removed downvote" });
    }

    if (user.upvotes.includes(question_id)) {
      user.upvotes=user.upvotes.filter(ele=>ele!==question_id)
      await user.save();
      await Question.findByIdAndUpdate(
        question_id,
        { $inc: { upvotes: -1 } },
        { new: true }
      );
    }



    const question = await Question.findByIdAndUpdate(
      question_id,
      { $inc: { downvotes: 1 } },
      { new: true }
    );
    if (!question) {
      return res.status(404).json({downvoted, error: "Question not found" });
    }

    user.downvotes.push(question_id);
    await user.save();
    downvoted=true;
    res.status(200).json({downvoted, success: "Downvoted successfully" });
  } catch (error) {
    logEvent("downvoteQuestion",error.message);
    return res.status(500).json({error:"internal server error"});
  }
};

module.exports = downvoteQuestion;
