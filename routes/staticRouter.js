const express = require('express');
const router = express.Router();
const URL = require('../models/url')

//Home Page
router.get('/', async(req,res) => {
    if(!req.user) 
        return res.redirect('/login')
    
    const allUrls = await URL.find({createdBy: req.user._id})
    return res.render('home',{
        urls: allUrls
    });
});

//Signup
router.get('/signup', async(req,res) => {
    return res.render('signup');
});

//Login
router.get('/login', async(req,res) => {
    return res.render('login');
});


module.exports = router;