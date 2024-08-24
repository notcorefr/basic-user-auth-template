const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const userModel = require('../models/users');
const decryptPassword = require('../utils/decryptPassword');
const encryptPassword = require('../utils/encryptPassword');
const createSession = require('../utils/createSession');
const algorithm = 'aes-256-cbc';


router.post('/register', async (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        res.send({
            notify: 1,
            message: 'Please Fill The Values First'
        })
        return;
    }

    if (!(await isUniqueUsername(username))) {
        res.send({
            notify: 1,
            message: `A user With That username already exists, Try another one`
        })
        return;
    }

    if (password < 5) {
        res.send({
            notify: 1,
            message: 'Password must be atleast 5 charecters long'
        })
    }


    const { encryptedPass, key, iv } = encryptPassword(password, algorithm);


    let newUser = new userModel({
        username: username,
        hashedPassword: encryptedPass,
        key: key,
        iv: iv,
        createdOn: Date.now()
    })

    await newUser.save();
    console.log('Successfully Created user ' + username + ' with hashed pass ' + encryptedPass);

    const session = await createSession(username, password);

    res.send({
        message: 'Registration Successful',
        notify: 0,
        sessionId: session.id
    })

});

async function isUniqueUsername(username) {
    let res = await userModel.findOne({ username: username });
    if (!res) {
        return true;
    }
    return false;
}

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.send({
            notify: 1,
            message: `Please, Fill The Values correctly`
        });
        return;
    }


    const user = await userModel.findOne({ username: username });
    if (!user) {
        res.send({
            notify: 1,
            message: `No User with That username Found.`
        });
        return;
    }


    if (!user.key || !user.iv) {
        console.log('no key')
        return;
    }


    const decryptedPass = decryptPassword(user.hashedPassword, algorithm, user.key, user.iv);

    if (decryptedPass != password) {
        res.send({
            notify: 1,
            message: `The Password is Incorrect, Try Again`
        });
        return;
    }


    let session;
    try {
        session = await createSession(username, decryptedPass);
    } catch (err) {
        console.log(err);
        res.send({
            notify: 1,
            message: `${err}`,
        });
        return;
    }



    res.send({
        notify: 0,
        message: `Login Successful!`,
        session: session
    });

    return;

})



module.exports = router;
