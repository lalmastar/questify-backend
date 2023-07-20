const express = require("express");
const jwtVerify = require("../middleware/jwtVerify")
const router = express.Router()

router.post("/user/login",require("../controllers/login.controller"));//*
router.get("/user/logout",require("../controllers/logout.controller"));//*
router.post("/user/register",require("../controllers/register.controller"));//*
router.post("/set_avatar",jwtVerify,require("../controllers/setAvatar.controller"))//*
router.get("/refresh_jwt",require("../controllers/refreshJwt.controller"))//*
router.get("/user/details",jwtVerify,require("../controllers/userDetails.controller"))
module.exports=router;