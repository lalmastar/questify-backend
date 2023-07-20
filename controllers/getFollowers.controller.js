const User = require("../models/UserSchema");
const logEvent = require("../utils/logErrors");

const getFollowers = async (req,res) =>{
    try{
        const {user_id} = req.body;
        const getFollowings = await User.findById(user_id,{"followers":1,"following":1});
        let followingsData = [];
        for(let id of getFollowings.followers){
            const following = await User.findById(id,{"avatar":1,"firstname":1,"lastname":1,"followers":1,"profession":1});
            followingsData.push({
                username:following.firstname+" "+following.lastname,
                avatar:following.avatar,
                id:following.id,
                isfollowing:getFollowings.following.includes(following.id),
                followers:following.followers.length,
                profession:following.profession
            })
        }
        return res.status(201).json(followingsData);
    }catch(error){
        logEvent("getFollowers",error.message)
        return res.status(500).json({error:"internal server error"});
    }
}

module.exports=getFollowers;