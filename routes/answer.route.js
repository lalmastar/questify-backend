const express = require("express");
const router = express.Router()

router.post("/:question_id/add_answer",require("../controllers/addAnswer.controller"))//*
router.put("/:answer_id/upvote",require("../controllers/upvoteAnswer.controller"))//*
router.put("/:answer_id/downvote",require("../controllers/downvoteAnswer.controller"))//*
router.get("/my_answers",require("../controllers/myAnswers.controller"))//*

module.exports=router