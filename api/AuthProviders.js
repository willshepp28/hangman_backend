const router = require("express").Router(),
    passportFacebook = require("../config/social/facebook"),
    jwt = require("jsonwebtoken");

// /api/v1/auth/providers/facebook

/**
 *  Facbook will redirect to this url after approval
 * 
 */


router.get("/facebook", passportFacebook.authenticate("facebook"));






router.get("/facebook/callback", passportFacebook.authenticate("facebook", { session: false }), async(request, response) => {

    console.log(request.user);
    let token = jwt.sign({ user: request.user }, process.env.JWT_SECRET);
    
    if(request.user) {
        return response.redirect(`http://localhost:4200/login?token=${token}`);
    }

    if(!request.user) {
        return response.redirect("https://localhost:3000/api/v1/login");
    }
    
   
});


module.exports = router;