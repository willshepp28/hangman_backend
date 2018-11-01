const express = require("express"),
    application = express();
passport = require("passport"),
    FacebookStrategy = require("passport-facebook").Strategy,
    // { Strategry: FacebookStrategy } = require("passport-facebook")
    knex = require("../../db/knex"),
    {
        GETfindByFBid,
        POSTcreateFBuser
    } = require("../../db/query/userQuery"),
    require('dotenv').config();;


// https://localhost:3000/api/v1/auth/providers/facebook/

/*
|--------------------------------------------------------------------------
| Strategry where users signup through facebook
|--------------------------------------------------------------------------
*/
passport.use(new FacebookStrategy({
    // clientID: process.env.TEST_FACEBOOK_APP_ID,
    // clientSecret: process.env.TEST_FACEBOOK_APP_SECRET,
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "https://localhost:3000/api/v1/auth/providers/facebook/callback"
},
    async (accessToken, refreshToken, profile, callback) => {


        const { id, displayName } = profile;
        // // 1. Check to see if user is already in the databse
        const User = await GETfindByFBid(id);

        if (User.length) {
            callback(null, User)
        }

        // 2. If not, create a new user in teh database
        if (!User.length) {
            console.log("no user in the database matching those credentials");
            const facebookUser = await POSTcreateFBuser(id, displayName).returning("*")
                .then(fbUser => { console.log(fbUser) })
                .catch(error => { console.log(error) });

                callback(null, facebookUser);
        }

        
        
    }
));



module.exports = passport;