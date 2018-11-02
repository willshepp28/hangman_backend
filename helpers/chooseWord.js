const rword = require("rword");


/*
|--------------------------------------------------------------------------
| This method generates a random word based on the level of difficulty the user has chosen
    1. Easy = 2-3 letters
    2. Medium = 4-5 letters
    3. Hard = 6-7 letters
|--------------------------------------------------------------------------
*/
function chooseWords(level) {
    // console.log(level);
    var randomPick;


    // if the user picks easy difficulty
    if(level === "easy"){
        console.log("its easy")
        randomPick = rword.generate(1, { length: '2-3' });
    }

    // if the user picks medium difficulty
    if(level === "medium") {
        console.log("its medium")
        randomPick = rword.generate(1, { length: '4-5' });
    }

    // if the user picks hard difficulty
    if(level === "hard") {
        console.log("its hard")
        randomPick = rword.generate(1, { length: '6-7' })
    }

    var wordArr = randomPick.split("");
    var wordMatchs = "";


    // iterate over the array get all the dashs for our matchs row in the game db
    wordArr.forEach((character) => {
        wordMatchs += "-";
    });

    return [randomPick, wordMatchs.trimRight()]

}






module.exports = {
    chooseWords: chooseWords
}