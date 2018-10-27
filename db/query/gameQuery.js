/*
 |--------------------------------------------------------------------------
 | Require Dependencies
 |--------------------------------------------------------------------------
 */
const knex = require("../knex");


function Game() {
    return knex("game");
};

function SelectGame(...props) {
    return knex.select(...props).from("game");
};





/*
|--------------------------------------------------------------------------
|  QUERY - get the game where game.won and game.isComplete is false
|--------------------------------------------------------------------------
*/
function gameWhereWonFalse(gameId, userId) {
    console.log(gameId)
    return Game().where({ id: parseInt(gameId), userId: userId, won: false, isComplete: false })
};



/*
|--------------------------------------------------------------------------
|  QUERY - get the game by id
|--------------------------------------------------------------------------
*/
function getGameById(gameId, userId) {
    return Game().where({ id: parseInt(gameId), userId: userId })
};


/*
|--------------------------------------------------------------------------
| QUERY - to get the games that the user has completed
|--------------------------------------------------------------------------
*/
function gameWhereComplete(userId) {
    return Game().where({ userId: userId, isComplete: true });
};


/*
|--------------------------------------------------------------------------
| QUERY - to get the games that the user has completed
|--------------------------------------------------------------------------
*/
function createGame(userId, randomWord, wordMatchs) {
    return Game().insert({ userId: userId, word: randomWord, matchs: wordMatchs.trimRight() });
};



/*
|--------------------------------------------------------------------------
| QUERY - when user adds a input this is the query for getting the updated match, attempt data on game
|--------------------------------------------------------------------------
*/
function updatedGameInfo(gameId, userId) {
    return SelectGame("matchs", "attempts", "status").where({ id: parseInt(gameId),  userId: userId});
};



/*
|--------------------------------------------------------------------------
| QUERY - to see if what game completion status is
|--------------------------------------------------------------------------
*/
function checkCompletion(gameId, userId) {
    return SelectGame("isComplete").where({ id: parseInt(gameId), userId: userId });
};







module.exports = {
    GETGameById: getGameById,
    GETgameWhereComplete: gameWhereComplete,
    GETupdatedGameInfo: updatedGameInfo,
    GETgameWhereWonFalse: gameWhereWonFalse,
    GETcheckCompletion: checkCompletion,
    POSTcreateGame: createGame
};