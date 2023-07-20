const filterKeywords = require("../utils/filterKeywords");
const Question = require("../models/QuestionSchema");
const logEvent = require("../utils/logErrors");

const recommendedQuestions = async (req, res) => {
  try {
    const { question_text } = req.params;

    if (!question_text)
      return res.status(404).json({ error: "select a vaild question" });

    const words = await filterKeywords(question_text);
    const searchQuery = words.join(" ");

    const questions = await Question.find(
      { $text: { $search: searchQuery } },
      { _id: 1, question: 1 }
    );

    return res.status(201).json(questions);
  } catch (error) {
    logEvent("recommendedQuestions", error.message);
    return res.status(500).json({ error: "internal server error" });
  }
};

module.exports = recommendedQuestions;
