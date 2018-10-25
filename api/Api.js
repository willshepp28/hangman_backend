const router = require("express").Router(),
    randomWords = require("random-words"),
    { getUser} = require("../db/query/userQuery"),
    { registerUser} = require("../db/query/authQuery"),
    { verifyToken } = require("../helpers/verifyToken"),
    { encrypt } = require("../helpers/encrypt"),
     knex = require("../db/knex");




router.get("/", async (request, response) => {

    var users = await knex.select()
        .from("users")
        .then(user => { return user })
        .catch(error => response.status(400).json(error));


    response.status(200).json(users);

});


/*
|--------------------------------------------------------------------------
|  Login Api - Page where users login 
|--------------------------------------------------------------------------
*/
router.post("/login", (request, response) => {

    /*
        Authenticates user by passing the request.body to the getUser function
    */  
//  console.log(request.body);
//    response.status(200).json(request.body);
    registerUser(request.body)
       
});




/*
|--------------------------------------------------------------------------
|  SignUp Api - Page where users login 
|--------------------------------------------------------------------------
*/
router.post("/signup", (request, response) => {
    console.log(request.body);


    if(request.body.username && request.body.password) {

        knex("users")
            .insert({
                username: request.body.username,
                password: encrypt(request.body.password)
            })
            .returning("*")
            .then(success => {

                console.log(success);
                return response.status(200).json("New user has been created");
            })
            .catch(error => { return response.status(500).json(error)})

    } else {
        return response.status(500).json(error);
    }
    
});





/*
|--------------------------------------------------------------------------
|  Game Api - where we start the game
|--------------------------------------------------------------------------
*/
router.get("/startGame", async (request, response) => {

    // .createTable("game", (table) => {
    //     table.increments();
    //     table.integer("userId").unsigned().references("id").inTable("users");
    //     table.text("word").notNullable();
    //     table.integer("attempts").notNullable().defaultTo(0);
    //     table.boolean("won").notNullable().defaultTo(false);
    // })

    // Randomly generates a word 
    // The maximum length it will randomly generate is 5 words
    const word = randomWords({ exactly: 1, maxLength: 5 })[0];



    response.status(200).json(word);
})



module.exports = router;