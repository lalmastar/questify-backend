const User = require("../models/UserSchema");
const logEvent = require("../utils/logErrors");

const userDetails = async (req,res) =>{
    try{
        const user = await User.findById(req.body.user_id,{"firstname":1,"lastname":1,"avatar":1,"email":1,"profession":1,"followers":1,"following":1});
        if(user){
            const userDataFilter={
                username:user.firstname+" "+user.lastname,
                email:user.email,
                avatar:user.avatar,
                profession:user.profession,
                followers:user.followers.length,
                following:user.following.length
            }
            return res.status(201).json(userDataFilter);
        }
        return res.status(404).json({error:"user is not found"})
    }catch(error){
        logEvent("userDetails",error.message)
        return res.status(500).json({error:"internal server error"});
    }
}

module.exports = userDetails 