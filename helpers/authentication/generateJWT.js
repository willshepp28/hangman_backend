const jwt = require("jsonwebtoken");




async function generateJWT(userId, username) {
    
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        username: username,
        id: userId,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
      }, 'secret');

};



module.exports = {
    generateJWT: generateJWT
};