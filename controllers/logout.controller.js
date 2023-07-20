const logEvent = require("../utils/logErrors");

const logout=async (req,res)=>{
    try{
        const cookies=req.cookies;
        if(!cookies?.jwt) return res.sendStatus(204); //204->stands for no content

        res.clearCookie('jwt',{ httpOnly:true,
                                sameSite:'None',     // to allow frontEnd(Cross Platform) also in the same domain
                                secure:true
                              });
        return res.sendStatus(204);
    }catch(error){
        logEvent("logout",error.message)
        return res.status(500).json({error:"internal server error"});
    }
}

module.exports = logout 