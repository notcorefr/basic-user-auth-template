const express = require('express');
const crypto = require('crypto');
const userModel = require('../models/users');
const router = express.Router();
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

    
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);

    
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    
    let encryptedPass = cipher.update(password, 'utf8', 'hex');
    encryptedPass += cipher.final('hex');

    let newUser = new userModel({
        username: username,
        hashedPassword: encryptedPass,
        key: key,
        iv: iv,
        createdOn: Date.now()
    })

    newUser.save();
    console.log('Successfully Created user ' + username + ' with hashed pass ' + encryptedPass);




    res.send({
        message: 'Registration Successful',
        notify: 0
    })

});

async function isUniqueUsername(username) {
    let res = await userModel.findOne({ username: username });
    if (!res) {
        return true;
    }
    return false;
}

router.post('/login', async(req, res) => {
    const {username, password} = req.body;

    if(!username || !password){
        res.send({
            notify: 1,
            message:`Please, Fill The Values correctly`
        });
        return;
    }

    
    const user = await userModel.findOne({username: username});
    if(!user){
        res.send({
            notify: 1,
            message: `No User with That username Found.`
        });
        return;
    }


    if(!user.key || !user.iv){
        console.log('no key')
        return;
    }


    const decipher = crypto.createDecipheriv(algorithm, user.key, user.iv);
    

    let decryptedPass = decipher.update(user.hashedPassword, 'hex', 'utf8');
    decryptedPass += decipher.final('utf8');
    console.log(decryptedPass)

    if(decryptedPass != password){
        res.send({
            notify: 1,
            message: `The Password is Incorrect, Try Again`,
        });
        return;
    }

    res.send({
        notify: 0,
        message: `Login Successful!`,
    });

    return;



})



module.exports = router;
