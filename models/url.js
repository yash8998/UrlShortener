const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId:{
        type: String,
        required: true,
        unique: true
    },
    redirectURL:{
        type : String,
        required: true
    },
    visitHistory:[{ timestamp: {type: Number}}],
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        // Ref is the users table in db
        ref: "users",
    }
},
// To get time
{timestamps:true}
);

const URL = mongoose.model("url",urlSchema)

module.exports = URL;