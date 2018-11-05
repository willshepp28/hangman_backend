const router = require("express").Router();
const { GETgamesSaved } = require("../db/query/gameSavedQuery");
verifyToken = require("../helpers/verifyToken"),


/*
|--------------------------------------------------------------------------
|  GET - gets all the games the user hasnt won yet
|--------------------------------------------------------------------------
*/
router.get("/", verifyToken, async(request, response) => {
   

   try {
    const games = await GETgamesSaved(request.userId);
    return response.status(200).json(games);
   }
   catch(error) {
       return response.status(500).json(error);
   }
        
});





module.exports = router;