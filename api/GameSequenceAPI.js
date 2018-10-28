const router = require("express").Router(),
    { POSTplayerLost, POSTplayerWon } = require("../db/query/gameSequenceQuery"),
    { GETgameWhereWonFalse } = require("../db/query/gameQuery"),
    verifyToken = require("../helpers/verifyToken"),
    knex = require("../db/knex");



/*
|--------------------------------------------------------------------------
| POST - To update game.status to lost, and game.isComplete to true 
|       * used in the game component, when the user has made 10 incorrect attempts
|--------------------------------------------------------------------------
*/
router.post("/lost", verifyToken, async (request, response) => {

    await POSTplayerLost(request.body.id, request.userId)
        .returning("status")
        .then(data => response.status(200).json(data))
        .catch(error => response.status(400).json(error));
});




/*
|--------------------------------------------------------------------------
| POST - To update game.status to lost, and game.isComplete to true 
|       * used in the game component, when the user has made 10 incorrect attempts
|--------------------------------------------------------------------------
*/
router.post("/won", verifyToken, async (request, response) => {

    await GETgameWhereWonFalse(request.body.id, request.userId)
        .returning("*")
        .then(game => {
            console.log(game);

        });


    // POSTplayerWon(request.body.id, request.userId)
    //     .returning("status")
    //     .then(data => response.status(200).json(data))
    //     .catch(error => response.status(400).json(error));
});




module.exports = router;