const express = require('express');
const urlRoute = require('./routes/url');
const {connectToMongoDB} = require('./connect');

const URL = require('./models/url')

const app = express();
const PORT = 8001;

// Connect MongoDB
connectToMongoDB('mongodb://localhost:27017/short-url').then(
    () => console.log('MongoDB Connected')
);

// To parse url body
app.use(express.json());

// Any url with prefix '/url' will use this router and methods
app.use("/url", urlRoute);


//Temporary : Fetch from db and increment
app.get('/:shortId', async (req,res) =>{
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