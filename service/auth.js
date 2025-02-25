const jwt = require('jsonwebtoken')
const key = "Yash@JWTAuth"

function setUser(user){
    return jwt.sign({
        _id: user._id,
        email: user.email,
    }, key)
}

function getUser(token){
    if(!token) return null;
    try{
        console.log("Token Received for Verification:", token);
        return jwt.verify(token, key)
    }catch(error){
        return null
    }
    
}

module.exports = {
    setUser,
    getUser
}