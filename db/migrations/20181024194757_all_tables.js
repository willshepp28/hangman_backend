
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("users", (table) => {
        table.increments();
        table.string("username").notNullable();
        table.text("password").notNullable();
    })
    .createTable("game", (table) => {
        table.increments();
        table.integer("userId").unsigned().references("id").inTable("users"); // we get the userId to know who the user is
        table.text("word").notNullable(); // we have the word table to see what the word is 
        table.text("matchs").defaultTo(); // we use this to get all the words user matched in word table
        table.integer("attempts").notNullable().defaultTo(0);  // we have a attempts table to track the users attempts
        table.boolean("won").notNullable().defaultTo(false);  // we have a won category to see if the user has won
        table.boolean("isComplete").notNullable().defaultTo(false); // we use this to check if the user has finished the game by giving up/losing/or winning
        table.string("status").notNullable().defaultTo("pending");
    })
    
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("game").dropTable("users");
};
