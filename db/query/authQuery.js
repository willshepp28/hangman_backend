/*
 |--------------------------------------------------------------------------
 | Require Dependencies
 |--------------------------------------------------------------------------
 */
const knex = require("../knex");


function Authentication() {
    return knex("users");
};

function SelectAuthentication(...props) {
    return knex.select(...props).from("users");
};







module.exports = {};
