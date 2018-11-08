/*
 |--------------------------------------------------------------------------
 | Require Dependencies
 |--------------------------------------------------------------------------
 */
const knex = require("../knex");
const { encrypt } = require("../../helpers/encrypt");


function Authentication() {
    return knex("users");
};

function SelectAuthentication(...props) {
    return knex.select(...props).from("users");
};


/*
|--------------------------------------------------------------------------
|  QUERY - signs up new user
|--------------------------------------------------------------------------
*/
function signUp(username, password) {
    return knex("users").insert({ username: username, password: encrypt(password)})
}



/*
|--------------------------------------------------------------------------
|  QUERY - authenticates user
|--------------------------------------------------------------------------
*/
function logIn(username, password) {
    return knex("users").where({ username: username, password: encrypt(password)})
}





module.exports = {
    POSTsignUp: signUp,
    GETlogin: logIn
};
