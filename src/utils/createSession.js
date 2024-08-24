const sessionModel = require('../models/session');
const decryptPassword = require('./decryptPassword');
const userModel = require('../models/users');
const algorithm = 'aes-256-cbc';

async function createSession(username, password) {
    const existingUser = await userModel.findOne({ username: username });
    if (!existingUser) {
        throw new Error('User Doesnt Exist!');
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

    let expiryDate = new Date();
    expiryDate.setDate((new Date().getDate() + 2))

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

    return session;

}

module.exports = createSession;

function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}