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


/*
|--------------------------------------------------------------------------
|  QUERY - gets the username
|--------------------------------------------------------------------------
*/
function findOrCreate(username) {
    return User().where({ username: username})
        .then(response => {
            // if there is no users then create one
            if( response.length === 0) {
                return User().insert({ username: username});
            }
        });
};






module.exports = {
    GETUsernameById: getUsernameById,
    POSTfindorCreate: findOrCreate
}