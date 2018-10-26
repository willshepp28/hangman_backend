const router = require("express").Router(),
    randomWords = require("random-words"),
    verifyToken = require("../helpers/verifyToken"),
    knex = require("../db/knex");


router.get("/", (request, response) => {
    console.log(request.body);
    response.json(randomWords());
});




// .createTable("game", (table) => {
//     table.increments();
//     table.integer("userId").unsigned().references("id").inTable("users"); // we get the userId to know who the user is
//     table.text("word").notNullable(); // we have the word table to see what the word is 
//     table.text("word-matchs"); // we use this to get all the words user matched in word table
//     table.integer("attempts").notNullable().defaultTo(0);  // we have a attempts table to track the users attempts
//     table.boolean("won").notNullable().defaultTo(false);  // we have a won category to see if the user has won
//     table.boolean("isComplete").notNullable().defaultTo(false); // we use this to check if the user has finished the game by giving up/losing/or winning
// })

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
            console.log(gameData);
            return response.status(200).json({ gameId: gameData[0].id, attemps: gameData[0].attempts, wordLength: gameData[0].word.length, isComplete: gameData[0].isComplete });
        })
});


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
                wordLength: gameInfo[0].word.length,
                isComplete: gameInfo[0].isComplete
            }

            return response.status(200).json(data);
        })

});


router.post("/addWord/:postId", verifyToken, async (request, response) => {

    // .createTable("game", (table) => {
    //     table.increments();
    //     table.integer("userId").unsigned().references("id").inTable("users"); // we get the userId to know who the user is
    //     table.text("word").notNullable(); // we have the word table to see what the word is 
    //     table.text("word-matchs"); // we use this to get all the words user matched in word table
    //     table.integer("attempts").notNullable().defaultTo(0);  // we have a attempts table to track the users attempts
    //     table.boolean("won").notNullable().defaultTo(false);  // we have a won category to see if the user has won
    //     table.boolean("isComplete").notNullable().defaultTo(false); // we use this to check if the user has finished the game by giving up/losing/or winning
    // })

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

            console.log(gameData);

            console.log(gameData[0].attempts);
            console.log(typeof gameData[0].attempts)
            if(gameData[0].attempts > 10) {
                return response.status(400).json("You have already exceeded 10 attemps");
            }
            // var wordMatchs = gameData[0].word-matchs; // a array from the word-matchs string in db

            var wordArr = gameData[0].word.split(""); // A array from the word string in db
            var userGuessArr = request.body.guess.split(""); // A array from the guess input the user sent

/*
|--------------------------------------------------------------------------
|  1. We need to see if the users input match any character in the word row returned from the db
|       * we need to check if the user already put has the guess in db
            - if so we need shouldnt add a attempt then send a response "already added"

        * if the user hasnt already added the word already we need to run through
            the characters in from the word table, to see if they match the input
            - if so, we need to increment attempts, then add the character to the word-matchs, at the correct position
            - if not we simply increase attempts, then send a response
|--------------------------------------------------------------------------
*/



            // Makes sure user doesnt try to access a game they have no access to
            if (gameData.length < 1) {
                return response.status(403).json("The user has no access to the game with this ID");
            }

            // console.log(gameData);
            response.status(200).json(gameData);
        })
        .catch(error => {
            console.log(error);
            response.status(400).json(error);
        });

});

module.exports = router;