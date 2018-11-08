const router = require("express").Router(),
    { authSchema } = require("../helpers/validators/authentication/authValidator"),
    { POSTsignUp, GETlogin } = require("../db/query/authQuery"),
    Joi = require("joi"),
    jwt = require("jsonwebtoken");






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
            .catch(error => { return response.status(400).send("Username or password is incorrect") })
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
            .then(() => { return response.status(200).send("Success") })
            .catch((error) => { return response.status(400).send(error) })

    })
});



module.exports = router;