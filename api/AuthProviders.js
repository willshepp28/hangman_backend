const router = require("express").Router(),
    passportFacebook = require("../config/social/facebook"),
    jwt = require("jsonwebtoken");



/**
 *  Facbook will redirect to this url after approval
 * 
 */


router.get("/facebook", passportFacebook.authenticate("facebook"));



router.get("/facebook/callback", passportFacebook.authenticate("facebook", { session: false }), async(request, response) => {

    let token = jwt.sign({ user: request.user }, process.env.JWT_SECRET);
    
    if(request.user) {
        return response.redirect(`https://hangman-frontend.herokuapp.com/login?token=${token}`);
    }

    if(!request.user) {
        return response.redirect("https://hangman-frontend.herokuapp.com/login");
    }
    
   
});


module.exports = router;