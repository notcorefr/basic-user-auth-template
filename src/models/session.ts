import { Schema, model } from "mongoose";

const sessionSchema = new Schema({
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

const sessionModel = model('sessionModel', sessionSchema);

export {sessionModel}