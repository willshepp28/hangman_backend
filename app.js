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
    port = process.env.PORT || 3000;



application = express();




/*
|--------------------------------------------------------------------------
|  Middleware
|--------------------------------------------------------------------------
*/
application.use(morgan('dev'));
// application.use(morgan('combined'))

// parse application/json
application.use(bodyParser.json());
// parse application/x-www-form-urlencoded
application.use(bodyParser.urlencoded({ extended: false }));


application.use(cors())

require('dotenv').config();







/*
|--------------------------------------------------------------------------
| Api
|--------------------------------------------------------------------------
*/

application.use("/api/v1", Api);





/*
|--------------------------------------------------------------------------
| Start Server
|--------------------------------------------------------------------------
*/
application.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});