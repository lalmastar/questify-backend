const express = require("express");
const router = express.Router();

router.put("/follow/:user",require("../controllers/follow.controller"))
router.get("/get_followers",require("../controllers/getFollowers.controller"))
router.get("/get_following",require("../controllers/getFollowings.controller"))

module.exports=router