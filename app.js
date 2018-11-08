/*
 |--------------------------------------------------------------------------
 | Require Dependencies
 |--------------------------------------------------------------------------
 */
const compression = require('compression'),
     express = require("express"),
    morgan = require("morgan"),
    cors = require("cors"),
    helmet = require("helmet"),
    bodyParser = require("body-parser"),
    expressValidator = require("express-validator"),
    joi = require("joi"),
    Api = require("./api/Api"),
    AuthProvidersApi = require("./api/AuthProviders"),
    userApi = require("./api/UserAPI"),
    gameApi = require("./api/GameAPI"),
    gamestatApi = require("./api/GameStatAPI"),
    gameSequenceApi = require("./api/GameSequenceAPI"),
    gameSavedApi = require("./api/GameSavedAPI");
    port = process.env.PORT || 3000;

application = express();




/*
|--------------------------------------------------------------------------
|  Middleware
|--------------------------------------------------------------------------
*/
console.clear();

application.use(helmet())

// console.log(fs.readlinkSync.toString(path.resolve("")))
application.use(compression())
// to log requests
 application.use(morgan('dev'));
 

// parse application/json
application.use(bodyParser.json());
// parse application/x-www-form-urlencoded
application.use(bodyParser.urlencoded({ extended: false }));

application.use(expressValidator());

application.use(function(request, response, next) {
    for (var item in request.body) {
      request.sanitize(item).escape();
    }
    next();
  });


application.use(cors());

require('dotenv').config();







/*
|--------------------------------------------------------------------------
| Api
|--------------------------------------------------------------------------
*/
application.use("/api/v1/game-saved", gameSavedApi);
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