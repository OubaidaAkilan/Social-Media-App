const crypto = require('crypto');

 function encryptToken(token) {
try {
  const iv = crypto.randomBytes(16);
  const key = crypto
    .createHash('sha256')
    .update('password')
    .digest('base64')
    .substr(0, 32);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

  let encrypted = cipher.update(token);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
} catch (error) {
  console.log(error);
}
}



module.exports = encryptToken;
