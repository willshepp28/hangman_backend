const router = require("express").Router(),
    randomWords = require("random-words"),
    verifyToken = require("../helpers/verifyToken"),
    knex = require("../db/knex");


/**
 * 
 *  This route is for all the game stats of the current user
 * 
 *  Make: 
 * api for the amount of games a user has played
 * api for the amount of games the user has won
 * api for the amount of games a user has lost
 * 
 * api to get all games for user by id
 */


/*
|--------------------------------------------------------------------------
|  GET - gets amount of games the user has played
|       - used in the account component
|--------------------------------------------------------------------------
*/
router.get("/amount/played", verifyToken, (request, response) => {
    
    knex("game")
        .where({
            userId: request.userId        
        })
        .count()
        .then( data =>  response.status(200).json(data))
        .catch(error => response.status(400).json(error));
});




/*
|--------------------------------------------------------------------------
|  GET - gets amount of games a user has won
|       - used in the account component
|--------------------------------------------------------------------------
*/
router.get("/amount/won", verifyToken, (request, response) => {
    
    knex("game")
        .where({
            userId: request.userId,
            won: true        
        })
        .count()
        .then( data =>  response.status(200).json(data))
        .catch(error => response.status(400).json(error));
});





/*
|--------------------------------------------------------------------------
|  GET - gets amount of games a user has lost and the game is complete
|       - used in the account component
|--------------------------------------------------------------------------
*/
router.get("/amount/lost", (request, response) => {
    
    knex("game")
        .where({
            userId: 1,
            won: false,
            isComplete: true    
        })
        .count()
        .then( data =>  response.status(200).json(data))
        .catch(error => response.status(400).json(error));
});


/*
|--------------------------------------------------------------------------
|  GET - gets all the users game info
|       - used in the account component
|--------------------------------------------------------------------------
*/
router.get("/", (request, response) => {
    
   knex.select("game.id", "word", "attempts",)
        .from("game")
        .where({
            userId: 1   
        })
        .then( data =>  response.status(200).json(data))
        .catch(error => response.status(400).json(error));
});








module.exports = router;