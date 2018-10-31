const express = require("express"),
    application = express();
passport = require("passport"),
    FacebookStrategy = require("passport-facebook").Strategy,
    knex = require("../../db/knex");




/*
|--------------------------------------------------------------------------
| Strategry where users signup through facebook
|--------------------------------------------------------------------------
*/
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/api/v1/auth/providers/facebook/callback",
    profileFields: ["username"]
},
    async function (accessToken, refreshToken, profile, facebookCallback) {
        console.log('success!!! access Token --->', accessToken);
        console.log('success!!! refresh Token --->', refreshToken);
        console.log('success!!! Profile --->', profile);
        console.log('Photo url --->', profile.photos[0].value);

        const { id, username } = profile;

        if (accessToken) { return facebookCallback(null, { accessToken, refreshToken, profile }) }
        if (refreshToken) { return facebookCallback(null, refreshToken) }

        return facebookCallback('ERROR : No refresh or access Token exists!')
    }
));



module.exports = passport;