const router = require("express").Router(),
    passportFacebook = require("../config/social/facebook"),
    knex = require("knex");


// /api/v1/auth/providers

/**
 *  Facbook will redirect to this url after approval
 * 
 */


// router.get("/facebook", passportFacebook.authenticate("facebook"));






// router.get("/facebook/callback", passportFacebook.authenticate("facebook", { failureRedirect: "api/v1/login"}),
//     function(request, response ){
//         return response.status(200).json(request.user);
//     }
// );


module.exports = router;