
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("game").del()
    .then(function () {
      // Inserts seed entries
      return knex("game").insert([
        { userId: 1, word: "food", attempts: 6, won: true},
        { userId: 1, word: "awesome", attempts: 11, won: false}
      ]);
    });
};
