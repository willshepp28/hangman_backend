const router = require("express").Router(),
    randomWords = require("random-words"),
    verifyToken = require("../helpers/verifyToken"),
    { gameValidation } = require("../helpers/errors/gameValidator"),
    { wordMatches } = require("../helpers/gameHelpers/wordMatchs"),
    { validateGuessInput } = require("../helpers/errors/inputErrors"),
    {
        GETGameById,
        GETgameWhereComplete,
        POSTcreateGame,
        POSTincreaseAttempts,
        GETupdatedGameInfo,
        GETgameWhereWonFalse,
        GETcheckCompletion

    } = require("../db/query/gameQuery"),
    { POSTplayerWon } = require("../db/query/gameSequenceQuery"),
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
                isComplete: gameInfo[0].isComplete,
                status: gameInfo[0].status
            }
            return response.status(200).json(data);
        })
        .catch(error => { return response.status(400).json(error) })

});




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
router.post("/addWord/:gameId", verifyToken, async (request, response) => {

    var userInput = request.body.guess; // the users input
    var regex = new RegExp(userInput, "gi");
    var alreadyMatched = false; // we switch this based on whether the user already guesses the word or not.

    // We pass in the game id , and userId to get the game the user is adding a word to 
    var game = await GETgameWhereWonFalse(parseInt(request.params.gameId), request.userId);
    var words = game[0].word.split("");
    var matchs = game[0].matchs.split("");
    var addAttempts = game[0].attempts + 1;


    // If the user already guesses the correct word before
    if (regex.test(game[0].matchs)) {
        console.log("The user already matched this word");
        alreadyMatched = true;
    }

    // if the word matchs the user input, and the user hasnt already guessed it before
     // The word Matchs function takes the user input and checks if any matches the word
        // If so we store the correct guess in the db
        // If not, we increment attempts
    if (regex.test(game[0].word) && alreadyMatched === false) {
        wordMatches(userInput, words, matchs, request.params.gameId, request.userId );

        // if the user guesses incorrectyl
    } else if (!regex.test(game[0].word && alreadyMatched === false)) {
        console.log("The user didnt match the word");
        POSTincreaseAttempts(request.params.gameId, request.userId, addAttempts)
            .returning("*")
            .then(success => { console.log(success) })
            .catch(error => { console.log(error), response.status(400).json(error) })
    }

  

    return response.status(200).json({
        attempts: game[0].attemps,
        matchs: game[0].matchs,
    });

})




/*
|--------------------------------------------------------------------------
| GET - returns updated game.matchs and game.attempts info when user adds new input
|       * used in game component
|--------------------------------------------------------------------------
*/
router.get("/updated/match/:gameId", verifyToken, async (request, response) => {

    await GETupdatedGameInfo(request.params.gameId, request.userId)
        .then(updatedGame => { /*console.log(updatedGame),*/ response.status(200).json(updatedGame) })
        .catch(error => { response.status(500).json(error) });
});



/*
|--------------------------------------------------------------------------
| GET - used to check if a post is already completed
|--------------------------------------------------------------------------
*/
router.get("/checkComplete/:gameId", verifyToken, (request, response) => {

    GETcheckCompletion(request.params.gameId, request.userId)
        .then(completionStatus => response.status(200).json(completionStatus))
        .catch(error => response.status(500).json(error));

});


module.exports = router;

