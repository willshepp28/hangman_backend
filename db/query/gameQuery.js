const knex = require("../knex");


function Game() {
    return knex("game");
};

function SelectGame(...props) {
    return knex.select(...props);
};


/*
|--------------------------------------------------------------------------
|  QUERY - get the game by id
|--------------------------------------------------------------------------
*/
function getGameById(gameId, userId) {
    return Game().where({ id: parseInt(gameId), userId: userId })
}


/*
|--------------------------------------------------------------------------
| QUERY - to get the games that the user has completed
|--------------------------------------------------------------------------
*/
function gameWhereComplete(userId) {
    return Game().where({ userId: userId, isComplete: true });
}


/*
|--------------------------------------------------------------------------
| QUERY - to get the games that the user has completed
|--------------------------------------------------------------------------
*/
function createGame(userId, randomWord, wordMatchs) {
    return Game().insert({ userId: userId, word: randomWord, matchs: wordMatchs.trimRight() });
}



/*
|--------------------------------------------------------------------------
| QUERY - when user adds a input this is the query for getting the updated match, attempt data on game
|--------------------------------------------------------------------------
*/
function updatedGameInfo(postId, userId) {
    return SelectGame("matchs", "attempts").from("game").where({ id: parseInt(postId), userId: userId });
}


module.exports = {
    GETGameById: getGameById,
    GETgameWhereComplete: gameWhereComplete,
    GETupdatedGameInfo: updatedGameInfo,
    POSTcreateGame: createGame
};