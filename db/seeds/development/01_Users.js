const { encrypt } = require("../../../helpers/encrypt");


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users").del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { username: "willshepp", password: encrypt("12345")},
        { username: "brianL", password: encrypt("67890")},
        { username: "betty", password: encrypt("112233")}
      ]);
    });
};
