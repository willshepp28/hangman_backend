/*
 |--------------------------------------------------------------------------
 | Require Dependencies
 |--------------------------------------------------------------------------
 */
const knex = require("../knex");


function GameSaved() {
    return knex("game");
};

function SelectGameSaved(...props) {
    return knex.select(...props).from("game");
};




/*
|--------------------------------------------------------------------------
|  QUERY - gets all the games that the user has not completed
|--------------------------------------------------------------------------
*/
function gamesSaved(userId) {
    return SelectGameSaved("id", "matchs", "attempts").where({ userId: userId, won: false, isComplete: false, status: "pending" })
};





module.exports = {
    GETgamesSaved: gamesSaved
};