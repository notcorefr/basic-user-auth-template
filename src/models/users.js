const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    hashedPassword: {
        type:String
    },
    key:{
        type:Buffer
    },
    iv:{
        type:Buffer
    },
    createdOn: {
        type: Date
    },

})

var userModel = mongoose.model('usermodel', userSchema);
module.exports = userModel; 