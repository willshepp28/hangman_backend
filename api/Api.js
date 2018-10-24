const router = require("express").Router();
const randomWords = require("random-words");




router.get("/", (request, response) => {

    // print out random word
    response.status(200).json(randomWords());
}); 



module.exports = router;