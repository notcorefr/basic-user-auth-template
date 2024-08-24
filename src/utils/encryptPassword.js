const crypto = require('crypto');

function encryptPassword(rawPassword ,algorithm){
    const _key = crypto.randomBytes(32);
    const _iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, _key, _iv);
    
    let encryptedPass = cipher.update(rawPassword, 'utf8', 'hex');
    encryptedPass += cipher.final('hex');

    return {
        encryptedPass: encryptedPass, 
        key: _key,
        iv: _iv,
    }
}

module.exports = encryptPassword;