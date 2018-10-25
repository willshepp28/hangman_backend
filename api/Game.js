const router = require("express").Router(),
randomWords = require("random-words"),
verifyToken = require("../helpers/verifyToken"),
knex = require("../db/knex");


router.get("/",  (request, response) => {
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

router.post("/create", async(request, response) => {
  
   
    // Get token id from request body
    // Create a new game
    const newGame = await knex("game")
        .insert({
            userId: request.body.tokenId,
            word: randomWords({ exactly: 1, maxLength: 5 })[0]
        })
        .returning("*")
        .then((gameData) => {
            return response.status(200).json({ gameId: gameData[0].id, attemps: gameData[0].attempts, wordLength: gameData[0].word.length, isComplete: gameData[0].isComplete});
        })
});

module.exports = router;