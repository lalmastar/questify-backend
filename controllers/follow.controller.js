const User = require("../models/UserSchema")
const logEvent = require("../utils/logErrors");

const follow = async (req,res) =>{
    try{
        const {user} = req.params;
        const {user_id} = req.body;
        if(!user) return res.status(404).json({error:"user not found"});
        
        let isfollowing=false;
        const currUser = await User.findById(user_id,{following:1});
        const that_user = await User.findById(user,{ "followers":1 });

        if(currUser.following.includes(user)){
            currUser.following = currUser.following.filter(followedUser=>followedUser!==user);
            that_user.followers = that_user.followers.filter(follower=>follower!==user_id)
            await currUser.save();
            await that_user.save();
            return res.status(201).json({isfollowing,success:"user unfollowed"})
        }

        currUser.following.push(user);
        that_user.followers.push(user_id);
        await currUser.save();
        await that_user.save();
        isfollowing=true;
        return res.status(201).json({isfollowing,success:"user followed"})
    }catch(error){
        logEvent("follow",error.message)
        return res.status(500).json({error:"internal server error"});
    }
}

module.exports=follow;