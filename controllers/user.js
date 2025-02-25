const User = require('../models/user');
const {v4: uuidv4} = require('uuid')
const {setUser} = require('../service/auth')

async function handleUserSignUp(req,res){
    const {name, email, password} = req.body;
    await User.create({
        name,
        email,
        password
    });
    return res.render("home")
}

async function handleUserLogin(req,res){
    const {email, password} = req.body;
    const user = await User.findOne({
        email,
        password
    });

    if(!user)
        return res.render("login",{
            error: "Invalid username or password"
    });

    // Map a session id for the user and return as a cookie
    const sessionid = uuidv4()
    setUser(sessionid,user)
    res.cookie("uid",sessionid)
    
    return res.redirect("/")
}

module.exports = {
    handleUserSignUp,
    handleUserLogin,
}