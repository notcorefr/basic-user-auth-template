import { Router } from 'express';
import { userModel } from '../models/users';
import { decryptPassword } from '@utils/decryptPassword';
import { encryptPassword } from '@utils/encryptPassword';
import { createSession } from '@utils/createSession';
import { error } from 'console';

const router = Router();
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

    const metaData = await createSession(username, password);

    res.send({
        message: 'Registration Successful',
        notify: 0,
        metaData: metaData,
    })

    return;
});

async function isUniqueUsername(username: string) {
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




    if (!user.hashedPassword || !user.key || !user.iv) {
        console.error('User Oject has some invaild values')
        return;
    }


    let metaData;


    try {
        const decryptedPass = decryptPassword(user.hashedPassword, algorithm, user.key, user.iv);

        if (decryptedPass != password || !decryptPassword) {
            res.send({
                notify: 1,
                message: `The Password is Incorrect, Try Again`
            });
            return;
        }


        metaData = await createSession(username, decryptedPass);
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
        metaData
    });

    return;

})



export { router };
