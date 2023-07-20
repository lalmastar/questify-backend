const express = require("express");
const router = express.Router()

router.get("/all_question",require("../controllers/allQuestions.controller"))//*
router.get("/my_questions",require("../controllers/myQuestions.controller"));//*
router.post("/add_question",require("../controllers/askQuestion.controller"))//*
router.put("/:question_id/upvote",require("../controllers/upvoteQuestion.controller"))//*
router.put("/:question_id/downvote",require("../controllers/downvoteQuestion.controller"))//*
router.get("/:question_text",require("../controllers/recommendedQuestions.controller"))//*


module.exports=router