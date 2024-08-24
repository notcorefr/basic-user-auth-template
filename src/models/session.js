const mongoose =  require('mongoose');

const sessionSchema = new mongoose.Schema({
    sessionId: {
        type: Number,
        unique: true,
    },
    username:{
        type:String,
        unique: true,
    },
    expiresOn:{
        type:Date,
    }
})

const sessionModel = mongoose.model('sessionModel', sessionSchema);

module.exports = sessionModel; 