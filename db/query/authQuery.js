const knex = require("../knex");

module.exports = {
    registerUser: function (credentials) {
       
        return knex("users")
            .insert({
                username: credentials.username,
                email: credentials.email,
                password: encrypt(credentials.password),
                phone_number: credentials.phone_number
            })
            .returning("id")
            .then(id => {
                return id;
            })
            .catch(error => {
                return false;
            })
    }
}