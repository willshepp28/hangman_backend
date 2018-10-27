const router = require("express").Router(),
    {
        GETtotalGamesPlayed,
        GETtotalGamesWon,
        GETtotalGamesLost

    } = require("../db/query/gameStatisticsQuery"),
    randomWords = require("random-words"),
    verifyToken = require("../helpers/verifyToken"),
    knex = require("../db/knex");


/**
 * 
 *  This route is for all the game stats of the current user
 */


/*
|--------------------------------------------------------------------------
|  GET - gets amount of games the user has played
|       - used in the account component
|--------------------------------------------------------------------------
*/
router.get("/amount/played", verifyToken, async (request, response) => {

    await GETtotalGamesPlayed(request.userId)
        .then(data => response.status(200).json(data))
        .catch(error => response.status(400).json(error));
});




/*
|--------------------------------------------------------------------------
|  GET - gets amount of games a user has won
|       - used in the account component
|--------------------------------------------------------------------------
*/
router.get("/amount/won", verifyToken, async (request, response) => {

    await GETtotalGamesWon(request.userId)
        .then(data => response.status(200).json(data))
        .catch(error => response.status(400).json(error));
});





/*
|--------------------------------------------------------------------------
|  GET - gets amount of games a user has lost and the game is complete
|       - used in the account component
|--------------------------------------------------------------------------
*/
router.get("/amount/lost", verifyToken, async(request, response) => {
    await GETtotalGamesLost(request.userId)
        .then(data => response.status(200).json(data))
        .catch(error => response.status(400).json(error));
});


/*
|--------------------------------------------------------------------------
|  GET - gets all the users game info
|       - used in the account component
|--------------------------------------------------------------------------
*/
router.get("/", verifyToken, (request, response) => {

    knex.select("game.id", "word", "attempts")
        .from("game")
        .where({
            userId: request.userId,
            isComplete: true
        })
        .then(data => response.status(200).json(data))
        .catch(error => response.status(400).json(error));
});








module.exports = router;