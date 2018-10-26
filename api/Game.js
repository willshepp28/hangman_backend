const router = require("express").Router(),
    randomWords = require("random-words"),
    verifyToken = require("../helpers/verifyToken"),
    knex = require("../db/knex");





/*
|--------------------------------------------------------------------------
|  POST - creates a new game 
|       - used when user clicks the begin game button on the home component
|--------------------------------------------------------------------------
*/
router.post("/create", async (request, response) => {


    var randomPick = randomWords({ exactly: 1, maxLength: 5 })[0]; // a randomly picked word
    var wordArr = randomPick.split(""); 
    var wordMatchs = ""; 



    // iterate over the array get all the dashs for our matchs row in the game db
    wordArr.forEach((character) => {
        wordMatchs += "- ";
    }); 

 
    // Create a new game
    const newGame = await knex("game")
        .insert({
            userId: request.body.tokenId,
            word: randomPick,
            matchs: wordMatchs.trimRight()
        })
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


    // get the info on specific game
    const gameInfo = await knex("game")
        .where({
            id: parseInt(request.params.id),
            userId: request.userId,
        })
        .then((gameInfo) => {

            let data = {
                attempts: gameInfo[0].attempts,
                matchs: gameInfo[0].matchs,
                isComplete: gameInfo[0].isComplete
            }

            return response.status(200).json(data);
        })

});







/*
|--------------------------------------------------------------------------
| POST - Where user guesses a word 
|       - this adds the input (users guess) to the specific game on the game component
|--------------------------------------------------------------------------
*/
router.post("/addWord/:postId", verifyToken, async (request, response) => {


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

    

    var addWord = await knex.select()
        .from("game")
        .where({
            id: parseInt(request.params.postId),
            userId: request.userId,
            won: false,
            isComplete: false
        })
        .then((gameData) => {

             // Makes sure user doesnt try to access a game they have no access to
             if (gameData.length < 1) {
                return response.status(403).json("The user has no access to the game with this ID");
            }
         
            // Checks to make sure the users hasnt already had over 9 attempts
            if(gameData[0].attempts > 10) {
                return response.status(400).json("You have already exceeded 10 attemps");
            }


/*
|--------------------------------------------------------------------------
|  1. We need to see if the users input match any character in the word property returned from the db
|       
        A)  We need to check the matchs property returned from the database,
            to see if the input (request.body.guess) the user sent is already in the in the matchs property

            - if so we need shouldnt add a attempt then send a response "already added"



        B) If the users input doesnt match any characters on the matchs property,
            run through the word property, to see if there any character match the input (request.body.guess)
            the characters in from the word table, to see if they match the input

                - If so, we increment the attempts property, then add the matching 
                  characters at the exact index, to the matchs property

                - If not we simply increment the attempts property, then send a response
|--------------------------------------------------------------------------
*/










            // console.log(gameData);
            response.status(200).json(gameData);
        })
        .catch(error => {
            console.log(error);
            response.status(400).json(error);
        });

});

module.exports = router;