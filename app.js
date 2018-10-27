/*
 |--------------------------------------------------------------------------
 | Require Dependencies
 |--------------------------------------------------------------------------
 */
const express = require("express"),
    morgan = require("morgan"),
    cors = require("cors"),
    bodyParser = require("body-parser");
    Api = require("./api/Api");
    userApi = require("./api/User");
    gameApi = require("./api/Game");
    gamestatApi = require("./api/GameStats");
    gameSequenceApi = require("./api/GameSequenceAPI");
    port = process.env.PORT || 3000;



application = express();




/*
|--------------------------------------------------------------------------
|  Middleware
|--------------------------------------------------------------------------
*/
console.clear();
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

application.use("/api/v1/game/sequence", gameSequenceApi);
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