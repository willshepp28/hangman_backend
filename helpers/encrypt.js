const crypto = require("crypto");


// Encrypts Password
let encrypt = (password => {
       
    if(typeof password !== '') {
        return crypto.pbkdf2Sync(password.toString(), "salt", 10, 512, "sha512")
        .toString("base64");
    } else {
        return crypto.pbkdf2Sync(password, "salt", 10, 512, "sha512")
        .toString("base64");
    }

});


module.exports = {encrypt};