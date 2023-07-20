const Answer = require("../models/AnswerSchema")
const User = require("../models/UserSchema")
const logEvent = require("../utils/logErrors");

const upvoteAnswer=async (req,res)=>{
    try {
      let upvoted=false;
        const answer_id = req.params.answer_id;
        const {user_id} = req.body
        if (!answer_id) {
          return res
            .status(400)
            .json({ upvoted,error: "Bad Request: Missing or invalid question ID" });
        }
    
        const user = await User.findById(user_id);
        if (!user) {
          return res.status(404).json({ upvoted,error: "User not found" });
        }
    
        if (user?.upvotes?.includes(answer_id)) {
            user.upvotes=user.upvotes.filter(ele=>ele!==answer_id)
            await user.save();
            await Answer.findByIdAndUpdate(answer_id,{ $inc: { upvotes: -1 } },{ new: true });
          return res.status(200).json({upvoted, success: "removed upvote" });
        }
    
        if (user?.downvotes?.includes(answer_id)) {
            user.downvotes=user.downvotes.filter(ele=>ele!==answer_id)
            await user.save();
            await Answer.findByIdAndUpdate(answer_id,{ $inc: { downvotes: -1 } },{ new: true });
        }
    
        const answer = await Answer.findByIdAndUpdate(
            answer_id,
          { $inc: { upvotes: 1 } },
          { new: true }
        );
        if (!answer) {
          return res.status(404).json({upvoted, error: "answer not found" });
        }
    
        user.upvotes.push(answer_id);
        await user.save();
        upvoted=true;
        res.status(200).json({ upvoted ,success: "upvoted successfully" });
      } catch (error) {
        logEvent("upvoteAnswer",error.message)
        return res.status(500).json({error:"internal server error"});
      }
}

module.exports=upvoteAnswer 