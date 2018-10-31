const express = require("express"),
    application = express();
passport = require("passport"),
    FacebookStrategy = require("passport-facebook").Strategy,
    knex = require("../../db/knex"),
    {
        GETfindByFBid,
        POSTcreateFBuser
    } = require("../../db/query/userQuery"),
    require('dotenv').config();;



/*
|--------------------------------------------------------------------------
| Strategry where users signup through facebook
|--------------------------------------------------------------------------
*/
passport.use(new FacebookStrategy({ 
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/api/v1/auth/providers/facebook/callback",
    profileFields: ["id", "first_name", "picture",]
},
    async function (accessToken, refreshToken, profile, facebookCallback) {
        

        const { id ,first_name } = profile._json;

      console.log("___________");
     console.log(id);
     console.log(first_name);
      console.log("___________");
        // Run this query and check if the user already exists
        const currentUser = await GETfindByFBid(id);

        if(!currentUser.length) {
            console.log("This user is currently not a member");
            await POSTcreateFBuser()
        }

       
    }
));



module.exports = passport;