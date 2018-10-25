
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("users", (table) => {
        table.increments();
        table.string("username").notNullable();
        table.text("password").notNullable();
    })
    .createTable("game", (table) => {
        table.increments();
        table.integer("userId").unsigned().references("id").inTable("users");
        table.text("word").notNullable();
        table.integer("attempts").notNullable().defaultTo(0);
        table.boolean("won").notNullable().defaultTo(false);
    })
    
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("game").dropTable("users");
};
