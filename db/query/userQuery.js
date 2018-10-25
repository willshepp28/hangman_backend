const knex = require("../knex");


module.exports = {
    getUser: (credentials) => {
        return knex("users")
                .where({
                    username: credentials.username,
                    password: credentials.password
                })
                .then(user => {

                    // If no user return false
                    if(user.length > 1) {
                        return false;
                    } else {
                        return user[0].id;
                    }
                })
    }
};