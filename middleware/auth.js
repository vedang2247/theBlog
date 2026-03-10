const { validateToken } = require("../services/authentication");

function checkforAuthentcation(cookieName){
    return (req,res,next) => {
        const tokenCookieValue=req.cookies[cookieName];
        if(!tokenCookieValue){
            return next();
        };
        try {
            const payload=validateToken(tokenCookieValue);
            req.user=payload;
        }
        catch(err) {console.log("Error is happening")}
        next()
    }
}

module.exports={
    checkforAuthentcation
}