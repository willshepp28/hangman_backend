const router = require("express").Router(),
    { getUser } = require("../db/query/userQuery"),
    { registerUser } = require("../db/query/authQuery"),
    verifyToken = require("../helpers/verifyToken"),
    { encrypt } = require("../helpers/encrypt"),
    { authSchema } = require("../helpers/validators/authentication/authValidator"),
    { POSTsignUp, GETlogin } = require("../db/query/authQuery"),
    Joi = require("joi"),
    jwt = require("jsonwebtoken"),
    knex = require("../db/knex");






/*
|--------------------------------------------------------------------------
|  Login Api - Page where users login 
|--------------------------------------------------------------------------
*/
router.post("/login", (request, response) => {

    Joi.validate(request.body, authSchema, (error, result) => {

        if (error) {
            return response.status(400).json(error);
        }

        GETlogin(request.body.username, request.body.password)
            .then(user => {

                // if user arrays is empty send a 202 status code
                if (user < 1) {
                    return response.status(404).json("no user found")
                } else {
                    let token = jwt.sign({ user: [{ id: user[0].id }] }, process.env.JWT_SECRET);
                    response.status(200).json({ token })
                }
            })
            .catch(error => { return response.status(500).json(error) })
    })
});




/*
|--------------------------------------------------------------------------
|  SignUp Api - Page where users login 
|--------------------------------------------------------------------------
*/
router.post("/signup", (request, response) => {

    Joi.validate(request.body, authSchema, (error, result) => {

        if (error) {
            return response.status(400).json(error);
        }

        POSTsignUp(request.body.username, request.body.password)
            .then(() => { return response.status(200).send("New user created") })
            .catch((error) => { return response.status(500).send(error) })

    })
});



module.exports = router;