/*
 |--------------------------------------------------------------------------
 | Require Dependencies
 |--------------------------------------------------------------------------
 */
const knex = require("../knex");


function User() {
    return knex("users");
};

function SelectUser(...props) {
    return knex.select(...props).from("users");
};






/*
|--------------------------------------------------------------------------
|  QUERY - gets the username
|--------------------------------------------------------------------------
*/
function getUsernameById(userId) {
    return SelectUser("username").where({ id: parseInt(userId)})
}






module.exports = {
    GETUsernameById: getUsernameById
}