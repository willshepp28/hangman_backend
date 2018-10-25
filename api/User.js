const router = require("express").Router(),
verifyToken = require("../helpers/verifyToken"),
knex = require("../db/knex");



/*
|--------------------------------------------------------------------------
|  GET - gets one user
|--------------------------------------------------------------------------
*/
router.get("/:id", verifyToken, async(request, response) => {
    
    // get user info
    var user = await knex("users")
                    .where({id: parseInt(request.params.id)})
                    .then(user => {response.status(200).json(user)})
                    .catch(error => { console.log(error), response.status(404).json(error)})
});


module.exports = router;