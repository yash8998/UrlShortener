const express = require('express');

//Routers for routes
const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');

const {connectToMongoDB} = require('./connect');

//Models
const URL = require('./models/url');

const path = require('path');

const app = express();
const PORT = 8001;

// Connect MongoDB
connectToMongoDB('mongodb://localhost:27017/short-url').then(
    () => console.log('MongoDB Connected')
);

// Using EJS for server side rendering
app.set('view engine','ejs');
app.set('views',path.resolve('./views'));

// To parse url body
app.use(express.json());
// To support form data
app.use(express.urlencoded({extended:false}));

// Setting routes
app.use("/url", urlRoute);
app.use("/",staticRoute);

// Testing UI
app.get('/test', async (req,res) =>{
    const allUrls = await URL.find({});
    return res.render('home',{
        urls: allUrls
    })
});


//Temporary : Fetch from db and increment
app.get('/url/:shortId', async (req,res) =>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId
        }, 
        {
            $push: {
                visitHistory :{
                    timestamp: Date.now(),
                },
            },
        }
    );
    res.redirect(entry.redirectURL)
});

app.listen(PORT, () => console.log(`Server started at port:${PORT}`))