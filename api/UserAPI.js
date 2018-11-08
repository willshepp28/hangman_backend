const router = require("express").Router(),
verifyToken = require("../helpers/verifyToken"),
{ 
    GETUsernameById
    
} = require("../db/query/userQuery");



/*
|--------------------------------------------------------------------------
|  GET - gets one user
|--------------------------------------------------------------------------
*/
router.get("/:id", verifyToken, async(request, response) => {
    
    await GETUsernameById(request.params.id)
                    .then(user => {response.status(200).json(user)})
                    .catch(error => { console.log(error), response.status(404).json(error)})
});


module.exports = router;