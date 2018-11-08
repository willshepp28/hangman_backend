const router = require("express").Router(),
    { getUser} = require("../db/query/userQuery"),
    { registerUser} = require("../db/query/authQuery"),
    verifyToken = require("../helpers/verifyToken"),
    { encrypt } = require("../helpers/encrypt"),
    { signupSchema } = require("../helpers/validators/authentication/signupValidator"),
    Joi = require("joi"),
    jwt = require("jsonwebtoken"),
     knex = require("../db/knex");






/*
|--------------------------------------------------------------------------
|  Login Api - Page where users login 
|--------------------------------------------------------------------------
*/
router.post("/login", (request, response) => {



    if(request.body.username && request.body.password) {

        knex("users")
            .where({
                username: request.body.username,
                password: encrypt(request.body.password)
            })
            .then(user => {

                // if user arrays is empty send a 202 status code
                if(user < 1) {
                    return response.status(404).json("no user found")
                } else {

                    let token = jwt.sign({ user: [{id: user[0].id}] }, process.env.JWT_SECRET);
                    response.status(200).json({ token })
                }
            })
            .catch(error => { console.log(error); return response.status(500).json(error)})
    } else {
        console.log(error);
        return response.status(500).json(error)
    }
       
});




/*
|--------------------------------------------------------------------------
|  SignUp Api - Page where users login 
|--------------------------------------------------------------------------
*/
router.post("/signup", (request, response) => {
    console.log(request.body);

    Joi.validate(request.body, signupSchema, (error, result) => {
        
        if(error) {
            console.log("not stored")
            return response.status(400).json(error);
        }

        knex("users")
        .insert({
            username: request.body.username,
            password: encrypt(request.body.password)
        })
        .returning("*")
        .then(success => {
            return response.status(200).json("New user has been created");
        })
        .catch(error => { return response.status(500).json(error)})

    })
});



module.exports = router;