const express = require("express");
const router = express.Router()

router.get("/getPageQueries",require("../controllers/getPageQueries.controller")) //*
router.get("/search",require("../controllers/search.controller")) //*
router.get("/:question_id",require("../controllers/getSingleQuery.controller")) //*

module.exports=router