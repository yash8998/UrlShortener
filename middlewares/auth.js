const {getUser} = require('../service/auth')

// Closure to carry out various steps in authentication
async function restrictToLoggedInUserOnly(req, res, next){
    // Get cookies
    const userUid = req.cookies?.uid;

    //Return to login if no cookie
    if (!userUid)
        return res.redirect("/login")

    const user = getUser(userUid)
    //Return to login if user not found for cookie
    if(!user)
        return res.redirect("/login")

    req.user = user;
    next()
}

async function checkAuth(req, res, next){
    // Get cookies
    const userUid = req.cookies?.uid

    const user = getUser(userUid)
    
    req.user = user
    next()
}

module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth,
}