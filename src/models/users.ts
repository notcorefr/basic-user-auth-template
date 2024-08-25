import { Schema, model } from "mongoose";

const userSchema = new Schema({
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

export const userModel = model('usermodel', userSchema);
 