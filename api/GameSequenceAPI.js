const router = require("express").Router();





router.post("/sequence/lost", (request, response) => {
    return response.status(200).json({message: "yup"});
});


module.exports = router;