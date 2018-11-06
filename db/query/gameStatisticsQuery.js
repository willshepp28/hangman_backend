/*
 |--------------------------------------------------------------------------
 | Require Dependencies
 |--------------------------------------------------------------------------
 */
const knex = require("../knex");


function GameStatistics() {
    return knex("game");
};

function SelectGameStatistics(...props) {
    return knex.select(...props).from("game");
};




/* Queries for game statistics */


/*
|--------------------------------------------------------------------------
|  QUERY - get the amount of games a user has played
|--------------------------------------------------------------------------
*/
function totalGamesPlayed(userId) {
    return GameStatistics().where({ userId: userId }).count();
};



/*
|--------------------------------------------------------------------------
|  QUERY - get the amount of games a user has won
|--------------------------------------------------------------------------
*/
function totalGamesWon(userId) {
    return GameStatistics().where({ userId: userId, won: true }).count();
};



/*
|--------------------------------------------------------------------------
|  QUERY - get the amount of games a user has lost
|--------------------------------------------------------------------------
*/
function totalGamesLost(userId) {
    return GameStatistics().where({ userId: userId, won: false, isComplete: true }).count();
};





module.exports = {
    GETtotalGamesPlayed: totalGamesPlayed,
    GETtotalGamesWon: totalGamesWon,
    GETtotalGamesLost: totalGamesLost
};