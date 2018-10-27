const express = require("express");



/*
|--------------------------------------------------------------------------
| This method makes sure the user input is valid
|--------------------------------------------------------------------------
*/
function validateGuessInput(userInput) {

    // checks if their is a valid input
    if (!userInput) {
        return response.status(400).json("input is required");
    }
    // checks if the input is a string
    if (typeof userInput !== "string") {
        return response.status(400).json("input must be a string")
    }
    // checks if the input is exactly 1
    if (userInput.length == 0 && request.body.guess.length < 1) {
        return response.status(400).json("Only one value per request");
    }
} ;


module.exports = {
    validateGuessInput: validateGuessInput
};