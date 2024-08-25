const crypto = require('crypto');

export function decryptPassword(encryptedPassword: string, algorithm: string, key: Buffer, iv: Buffer): string {

    if (!algorithm || !key || !iv) {
        throw new Error("NO parameters provied to decryptPassword function");
    };

    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    let decryptedPassword = decipher.update(encryptedPassword, 'hex', 'utf8');

    decryptedPassword += decipher.final('utf8');

    return decryptedPassword;
}
