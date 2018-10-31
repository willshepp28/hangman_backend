const crypto = require("crypto");
require('dotenv').config();



/**
 * 
 *  
 *      * We use the encrypt function to encrypt the users passowrd
 * 
 * 
 */




let encrypt = (password => {
       
    if(typeof password !== '') {
        return crypto.pbkdf2Sync(password.toString(), "salt", 10, 512, process.env.ENCRYPT_SECRET)
        .toString("base64");
    } else {
        return crypto.pbkdf2Sync(password, "salt", 10, 512, process.env.ENCRYPT_SECRET)
        .toString("base64");
    }

});


module.exports = {encrypt};