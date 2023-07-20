const User = require("../models/UserSchema");
const logEvent = require("../utils/logErrors");

const getFollowings = async (req,res) =>{
    try{
        const {user_id} = req.body;
        const getFollowers = await User.findById(user_id,{"following":1});
        let followersData = [];
        for(let id of getFollowers.following){
            const follower = await User.findById(id,{"avatar":1,"firstname":1,"lastname":1,"followers":1,"profession":1});
            followersData.push({
                username:follower.firstname+" "+follower.lastname,
                avatar:follower.avatar,
                id:follower.id,
                isfollowing:true,
                followers:follower.followers.length,
                profession:follower.profession
            })
        }
        return res.status(201).json(followersData);
    }catch(error){
        logEvent("getFollowers",error.message)
        return res.status(500).json({error:"internal server error"});
    }
}

module.exports=getFollowings