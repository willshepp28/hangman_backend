const express = require("express");



/*
|--------------------------------------------------------------------------
| This method makes sure that the user doesnt enter a game they have no access to.
| And makes sure they cant continue to play a game after theyve made 10 attempts
|--------------------------------------------------------------------------
*/
function gameValidation(gameData) {



    // Makes sure user doesnt try to access a game they have no access to
    if (gameData.length < 1) {
        return response.status(403).json({ message: "The user has no access to the game with this ID"});
    }

    // Checks to make sure the users hasnt already had over 9 attempts
    if (gameData[0].attempts >= 10) {
        return response.status(400).send({ message: "You have already exceeded 10 attemps"});
    }

    

};


module.exports = {
    gameValidation: gameValidation
};