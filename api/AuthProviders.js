const express = require("express"),
    knex = require("knex");


// /api/v1/auth/providers

router.get("/", (request, response) => {
    return response.status(200).json({
        message: "Successful arrived at the API route"
    });
});


module.exports = router;