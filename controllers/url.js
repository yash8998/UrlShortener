const {nanoid} = require('nanoid');

const URL = require('../models/url');

//Function to create shortId for URL in MongoDB
async function handleGenNewShortURL(req, res){
    const body = req.body;

    if(!body.url)
        return res.status(400).json({error:'Url is required'});

    //Generates a shortID of length 8
    const shortId = nanoid(8);

    //Create entry in database
    await URL.create({
        shortId:shortId,
        redirectURL: body.url,
        visitHistory: [],
    });

    return res.render("home",{
        id:shortId
    });
}

// Function to get analytics for a shortID of URL
async function handleGetAnalytics(req, res){
    const shortId = req.params.shortId;

    //Find the corresponding shortID in DB
    const result = await URL.findOne({shortId});

    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}

module.exports = {
    handleGenNewShortURL,
    handleGetAnalytics,
};