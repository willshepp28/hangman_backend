const router = require("express").Router(),
    randomWords = require("random-words"),
    verifyToken = require("../helpers/verifyToken"),
    {
        GETGameById,
        GETgameWhereComplete,
        POSTcreateGame,
        GETupdatedGameInfo,


    } = require("../db/query/gameQuery"),
    knex = require("../db/knex");







/*
|--------------------------------------------------------------------------
|  GET - gets all the games that are in progress but the user has completed 
|       - used in the account component
|--------------------------------------------------------------------------
*/
router.get("/completedGames", verifyToken, async (request, response) => {

    await GETgameWhereComplete(request.userId)
        .then(data => response.status(200).json(data))
        .catch(error => response.status(400).json(error));
});


/*
|--------------------------------------------------------------------------
|  POST - creates a new game 
|       - used when user clicks the begin game button on the home component
|--------------------------------------------------------------------------
*/
router.post("/create", verifyToken, async (request, response) => {


    var randomPick = randomWords({ exactly: 1, maxLength: 5 })[0]; // a randomly picked word
    var wordArr = randomPick.split("");
    var wordMatchs = "";


    // iterate over the array get all the dashs for our matchs row in the game db
    wordArr.forEach((character) => {
        wordMatchs += "-";
    });

    await POSTcreateGame(request.body.tokenId, randomPick, wordMatchs.trimRight())
        .returning("*")
        .then((gameData) => {
            return response.status(200).json({
                gameId: gameData[0].id,
                attemps: gameData[0].attempts,
                matchs: gameData[0].matchs,
                wordLength: gameData[0].word.length,
                isComplete: gameData[0].isComplete
            });
        })
});







/*
|--------------------------------------------------------------------------
|  GET - gets the game by id 
|       * gets the info we need about the game after use clicks begin on the home component
|--------------------------------------------------------------------------
*/
router.get("/:id", verifyToken, async (request, response) => {

    await GETGameById(request.params.id, request.userId)
        .then((gameInfo) => {

            let data = {
                attempts: gameInfo[0].attempts,
                matchs: gameInfo[0].matchs,
                isComplete: gameInfo[0].isComplete
            }
            return response.status(200).json(data);
        })
        .catch(error => { return response.status(400).json(error) })

});







/*
|--------------------------------------------------------------------------
| POST - Where user guesses a word 
|       - this adds the input (users guess) to the specific game on the game component
|--------------------------------------------------------------------------
*/
router.post("/addWord/:postId", verifyToken, async (request, response) => {



    // 1. // MAKE A HELPER FUNCTION THAT DOES THIS ////

    // checks if their is a valid input
    if (!request.body.guess) {
        return response.status(400).json("input is required");
    }
    // checks if the input is a string
    if (typeof request.body.guess !== "string") {
        return response.status(400).json("input must be a string")
    }
    // checks if the input is exactly 1
    if (request.body.guess.length == 0 && request.body.guess.length < 1) {
        return response.status(400).json("Only one value per request");
    }
    // 1. // MAKE A HELPER FUNCTION THAT DOES THIS ////




    var addWord = await knex.select()
        .from("game")
        .where({
            id: parseInt(request.params.postId),
            userId: request.userId,
            won: false,
            isComplete: false
        })
        .then((gameData) => {


            // 2. // MAKE A HELPER FUNCTION THAT DOES THIS ////

            // Makes sure user doesnt try to access a game they have no access to
            if (gameData.length < 1) {
                return response.status(403).json("The user has no access to the game with this ID");
            }

            // Checks to make sure the users hasnt already had over 9 attempts
            if (gameData[0].attempts > 10) {
                return response.status(400).json("You have already exceeded 10 attemps");
            }

            // 2. // MAKE A HELPER FUNCTION THAT DOES THIS ////


            /*
            |--------------------------------------------------------------------------
            |  1. We need to see if the users input match any character in the word property returned from the db
            |       
                    A)  We need to check the matchs property returned from the database,
                        to see if the input (request.body.guess) the user sent is already in the in the matchs property
            
                        - if so we do nothing,then send a response "already added"
            
            
            
                    B) If the users input doesnt match any characters on the matchs property,
                        run through the word property, to see if there any character match the input (request.body.guess)
                        the characters in from the word table, to see if they match the input
            
                            - If so, we increment the attempts property, then add the matching 
                              characters at the exact index, to the matchs property
            
                            - If not we simply increment the attempts property, then send a response
            |--------------------------------------------------------------------------
            */

            // Variables
            var userInput = request.body.guess; // the users input
            var matchs = gameData[0].matchs.split(""); // the matchs property
            var word = gameData[0].word.split("");
            var noMatch = true; // is true if we have no matchs 
            var addAttempts = gameData[0].attempts + 1;




            // iterate through the matchs array to see if any match the userInput
            matchs.forEach((character, index) => {

                // We check to see if the userInput matchs any characters on the matchs property
                if (character === userInput) {
                    console.log("here in character")
                    noMatch = false; // we have matchs so noMatch is false
                    return;
                }

            });




            // if the user input doesnt already match any words in the match property
            if (noMatch === true) {

                word.forEach((character, index) => {

                    // if a character in our word property matchs the user input
                    if (character === userInput) {


                        matchs.splice(index, 1, userInput); // removes the element in matchs property at the specific index, then adds new property
                        var updatedMatchs = matchs.join(""); // joins the array back to a string.

                        knex("game")
                            .where({
                                id: parseInt(request.params.postId),
                                userId: request.userId
                            })
                            .update({
                                matchs: updatedMatchs,
                                attempts: addAttempts
                            })
                            .returning("*")
                            .then(success => console.log(success));

                    }


                    // If we run through all the character in the words, and none match the user input
                    // increment attemps
                    if (word.length === index + 1) {

                        console.log("no matchs with the word property. we are now incrementing attempts");
                        knex("game")
                            .where({
                                id: parseInt(request.params.postId),
                                userId: request.userId
                            })
                            .update({ attempts: addAttempts })
                            .returning("*")
                            .then(success => { console.log })
                    }

                });
            }


        })
        .then(done => response.status(200).json(done))
        .catch(error => {
            console.log(error);
            response.status(400).json(error);
        });

});


/*
|--------------------------------------------------------------------------
| GET - returns updated game.matchs and game.attempts info when user adds new input
|       * used in game component
|--------------------------------------------------------------------------
*/
router.get("/updated/match/:postId", verifyToken, async (request, response) => {

    await GETupdatedGameInfo(request.params.postId, request.userId)
        .then(updatedGame => { response.status(200).json(updatedGame) })
        .catch(error => { response.status(500).json(error) });
});


module.exports = router;

