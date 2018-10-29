const knex = require("knex");
const express = require("express"),
    {
        GETGameById } = require("../../db/query/gameQuery"),
    {
        POSTplayerWon
    } = require("../../db/query/gameSequenceQuery");



    
/*
|--------------------------------------------------------------------------
| We use this function to see if the users guess, matchs the word in the database

    * If the word matchs we update the matches property of the specific game
    * If not, then we increase the attempts property of the specific game
|--------------------------------------------------------------------------
*/

async function wordMatches(userInput, words, matchs, gameId, userId) {


    // we only run this function is the word matches the correct guess from the user
    words.forEach((word, index) => {

        if (word === userInput) {

            matchs.splice(index, 1, userInput); // removes the element in matchs property at the specific index, then adds new property

            GETGameById(gameId, userId)
                .update({
                    matchs: matchs.join("")
                })
                .returning("*")
                .then(data => {

                    if (data[0].matchs === data[0].word && data[0].attempts < 10) {

                        POSTplayerWon(gameId, userId)
                            .returning("*")
                            .then((stats) => { console.log(stats) })
                            .catch(error => { console.log(error) });

                    }
                })
                .catch(error => { response.status(400).json(error) })

        }
    }
    )
};



module.exports = {
    wordMatches: wordMatches
}