import { sessionModel } from "@models/session";
import { decryptPassword } from "./decryptPassword";
import { userModel } from "@models/users";
import { throwDeprecation } from "process";

// const decryptPassword = require('./decryptPassword');
// const userModel = require('../models/users');
const algorithm = 'aes-256-cbc';



async function createSession(username: string, password: string): Promise<MetaData>{

    const existingUser = await userModel.findOne({ username: username });
    if (!existingUser) {
        throw new Error('User Doesnt Exist!');
    }


    if(!existingUser.hashedPassword || !existingUser.key || !existingUser.iv){
        throw new Error("Something went wrong!");
    }
    let decryptedPassword = decryptPassword(existingUser.hashedPassword, algorithm, existingUser.key, existingUser.iv);

    if (decryptedPassword != password) {
        throw new Error('Incorrect password.');
    }

    let existingSession, randomNum, i = 0;

    while (true) {
        randomNum = randomNumber(10000, 99999999999999);
        existingSession = await sessionModel.findOne({ sessionId: randomNum })
        if (!existingSession) break;
    }

    const date = 7;
    const expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + (date * 24 * 60 * 60 * 1000));

    let session;
    session = await sessionModel.findOne({ username: username });
    if (session) {
        session.sessionId = randomNum;
        session.expiresOn = expiryDate;

    } else {
        session = new sessionModel({
            username: username,
            sessionId: randomNum,
            expiresOn: expiryDate
        });

    }
    
    await session.save();
    
    const _username = session.username;
    const sessionId = session.sessionId;
    const sessionExpiresOn = session.expiresOn;

    if(!_username || !sessionId || !sessionExpiresOn){
        throw new Error("Something went wrong");
    }

    let metaData: MetaData = {
        user: { 
            username:_username,
        },
        session: {
            id: sessionId,
            expiresOn: sessionExpiresOn
        }
    }

    return metaData;

}

export {createSession}

function randomNumber(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
}