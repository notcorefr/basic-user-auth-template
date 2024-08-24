const crypto = require('crypto');

function decryptPassword(encryptedPassword, algorithm, key, iv){

    if(!algorithm || !key || !iv) return new Error("no params");


    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    
    let  decryptedPassword = decipher.update(encryptedPassword, 'hex', 'utf8');

    decryptedPassword += decipher.final('utf8');

    return decryptedPassword;
}

module.exports = decryptPassword;