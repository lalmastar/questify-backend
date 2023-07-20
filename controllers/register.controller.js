const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require("dotenv").config();
const logEvent = require("../utils/logErrors");


const postUser=async (req,res) =>{
    const {firstname,lastname,email,password,profession}=req.body;
    if(!firstname || !lastname || !password || !profession || !email){
        return res.status(400).json({error: "Please fill in all fields"});
    }
    try{
        const findUser = await User.findOne({email});
        if(findUser){
            return res.status(409).json({error:"User already exist"})
        }

        const salt = await bcrypt.genSalt(12,"a");
        const hashedPwd = await bcrypt.hash(password,salt);

        const newUser = new User({
            firstname,
            lastname,
            email,
            password:hashedPwd,
            profession,
            avatar:""
        })
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id.toString() },process.env.COMPANY_SECRETE,{expiresIn:"600s"});
        const refreshToken= jwt.sign({ userId: newUser._id.toString() },process.env.COMPANY_SECRETE,{expiresIn:"1d"});
        
        res.cookie('jwt',refreshToken,{
            httpOnly:true,
            sameSite:'None',     // to allow frontEnd(Cross Platform) also in the same domain
            secure:true, 
            maxAge:24*60*60*1000 //here expiry time is in mili seconds (1000ms ~ 1s)
        })
        res.status(201).json({token});
    
    }catch(err){
        logEvent("register",err.message)
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = postUser;