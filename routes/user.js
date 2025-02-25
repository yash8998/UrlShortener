const express = require('express');
const router = express.Router();
const {handleUserSignUp, handleUserLogin} = require('../controllers/user')
const URL = require('../models/url')

//signup
router.post('/',handleUserSignUp)

//login
router.post('/login', handleUserLogin)

module.exports = router;