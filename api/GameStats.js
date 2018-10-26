const router = require("express").Router(),
    randomWords = require("random-words"),
    verifyToken = require("../helpers/verifyToken"),
    knex = require("../db/knex");


/**
 * 
 *  This route is for all the game stats of the current user
 */


/*
|--------------------------------------------------------------------------
|  POST - creates a new game 
|       - used when user clicks the begin game button on the home component
|--------------------------------------------------------------------------
*/
router.get("/", (request, response) => {
    response.status(200).json("success");
});



module.exports = router;