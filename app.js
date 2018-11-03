/*
 |--------------------------------------------------------------------------
 | Require Dependencies
 |--------------------------------------------------------------------------
 */
const compression = require('compression'),
     express = require("express"),
    morgan = require("morgan"),
    cors = require("cors"),
    bodyParser = require("body-parser"),
    Api = require("./api/Api"),
    AuthProvidersApi = require("./api/AuthProviders"),
    userApi = require("./api/UserAPI"),
    gameApi = require("./api/GameAPI"),
    gamestatApi = require("./api/GameStatAPI"),
    gameSequenceApi = require("./api/GameSequenceAPI"),
    port = process.env.PORT || 3000;

application = express();




/*
|--------------------------------------------------------------------------
|  Middleware
|--------------------------------------------------------------------------
*/
console.clear();

// console.log(fs.readlinkSync.toString(path.resolve("")))
application.use(compression())
// to log requests
 application.use(morgan('dev'));
 

// parse application/json
application.use(bodyParser.json());
// parse application/x-www-form-urlencoded
application.use(bodyParser.urlencoded({ extended: false }));


application.use(cors());

require('dotenv').config();







/*
|--------------------------------------------------------------------------
| Api
|--------------------------------------------------------------------------
*/
application.use("/api/v1/auth/providers", AuthProvidersApi);
application.use("/api/v1/sequence", gameSequenceApi);
application.use("/api/v1/user", userApi);
application.use("/api/v1", Api);
application.use("/api/v1/game", gameApi);
application.use("/api/v1/gamestats", gamestatApi);




/*
|--------------------------------------------------------------------------
| Start Server
|--------------------------------------------------------------------------
*/
application.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


module.exports = application;