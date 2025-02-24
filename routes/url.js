const express = require('express');
const {handleGenNewShortURL,handleGetAnalytics} = require('../controllers/url');
const { model } = require('mongoose');
const router = express.Router();

//Generates a new shortid for url
router.post('/',handleGenNewShortURL);

//Get analytics for URL shortId
router.get('/analytics/:shortId',handleGetAnalytics);

module.exports = router;