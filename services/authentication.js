const JWT=require("jsonwebtoken");

const secret="$LKNDFLKFKEsed,fn.';'";

function createToken(user){
    const payload={
        id: user._id,
        email: user.email,
        ProfilePicUrl: user.ProfilePicUrl,
        role: user.role
    };
    const token= JWT.sign(payload,secret);
    return token;
}

function validateToken(token){
    const check=JWT.verify(token, secret);
    return check;
}

module.exports={
    createToken,
    validateToken
}