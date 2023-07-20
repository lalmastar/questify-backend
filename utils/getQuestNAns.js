const Question = require("../models/QuestionSchema");
const Answer = require("../models/AnswerSchema");


const getQuestNAns = async (question_id, single, req,userData) => {
  let quest = await Question.findById(question_id, {
    question: 1,
    upvotes: 1,
    downvotes: 1,
    date: 1,
  })
    .populate("user_id", "firstname lastname avatar profession followers")
    .exec();

  quest = {
    id: quest._id,
    question: quest.question,
    upvotes: quest.upvotes,
    isupvoted:userData.upvotes.includes(quest._id),
    downvotes: quest.downvotes,
    isdownvoted:userData.downvotes.includes(quest._id),
    date: quest.date,
    user: {
      id:quest.user_id._id,
      firstname: quest.user_id.firstname,
      lastname: quest.user_id.lastname,
      avatar: quest.user_id.avatar,
      profession: quest.user_id.profession,
      isfollowing: quest.user_id.followers.includes(req.body.user_id),
      followers: quest.user_id.followers.length,
    },
  };

  if (!single) {
    let answer = await Answer.find(
      { questionId: question_id },
      { answer: 1, downvotes: 1, upvotes: 1, date: 1 }
    )
      .populate("user_id", "firstname lastname avatar profession followers")
      .exec();

    if(answer.length){

      const answerRes = answer.map((ans) => ({
        id: ans._id.toString(),
        answer: ans.answer,
        upvotes: ans.upvotes,
        isupvoted:userData.upvotes.includes(ans._id),
        downvotes: ans.downvotes,
        isdownvoted:userData.downvotes.includes(ans._id),
        date: ans.date,
        user: {
          id:ans.user_id._id,
          firstname: ans.user_id.firstname,
          lastname: ans.user_id.lastname,
          avatar: ans.user_id.avatar,
          profession: ans.user_id.profession,
          isfollowing: ans.user_id.followers.includes(req.body.user_id),
          followers: ans.user_id.followers.length,
        },
      }));
      
      return { question: { ...quest, answer: answerRes } };
    }
    return { question: { ...quest, answer: false } };
  }else{
    let ans = await Answer.findOne(
        { questionId: question_id },
        { answer: 1, downvotes: 1, upvotes: 1, date: 1 }
      )
        .populate("user_id", "firstname lastname avatar profession followers")
        .exec();
    if(ans){
        const answer = {
          id: ans._id.toString(),
          answer: ans.answer,
          upvotes: ans.upvotes,
          isupvoted:userData.upvotes.includes(ans._id),
          downvotes: ans.downvotes,
          isdownvoted:userData.downvotes.includes(ans._id),
          date: ans.date,
          user: {
            id:ans.user_id._id,
            firstname: ans.user_id.firstname,
            lastname: ans.user_id.lastname,
            avatar: ans.user_id.avatar,
            profession: ans.user_id.profession,
            isfollowing: ans.user_id.followers.includes(req.body.user_id),
            followers: ans.user_id.followers.length,
          },
        }
        return { question: { ...quest, answer: answer } };
      }
      return { question: { ...quest, answer: false } };

    }
};

module.exports = getQuestNAns;
