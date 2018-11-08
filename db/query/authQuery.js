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
    return Authentication().insert({ username: username, password: encrypt(password)})
}



/*
|--------------------------------------------------------------------------
|  QUERY - authenticates user
|--------------------------------------------------------------------------
*/
function logIn(username, password) {
    return Authentication().where({ username: username, password: encrypt(password)})
}





module.exports = {
    POSTsignUp: signUp,
    GETlogin: logIn
};
