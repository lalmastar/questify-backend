const User = require("../models/UserSchema");
const logEvent = require("../utils/logErrors");

const setAvatar = async (req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.body.user_id, { avatar: req.body.avatar });
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        return res.status(201).json({avatar:req.body.avatar, success: "Avatar updated successfully" });
    }catch(error){
        logEvent("setAvatar",error.message)
        return res.status(500).json({error:"internal server error"});
    }

}

module.exports = setAvatar;