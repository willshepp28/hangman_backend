/*
 |--------------------------------------------------------------------------
 | Require Dependencies
 |--------------------------------------------------------------------------
 */
const knex = require("../knex");


function GameSequence() {
    return knex("game");
};

function SelectGameSequence(...props) {
    return knex.select(...props).from("game");
};




/*
|--------------------------------------------------------------------------
| QUERY - to update the game.status = "lost", and game.isComplete to true to show that the player has lost
|--------------------------------------------------------------------------
*/
function playerLost(gameId, userId) {
    return GameSequence().where({ id: parseInt(gameId), userId: userId}).update({ status: "lost", isComplete: true});
};







module.exports = {
    POSTplayerLost: playerLost
};