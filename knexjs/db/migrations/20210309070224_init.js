exports.up = function (knex) {
    return knex.schema.createTable("user", function (table) {
        table.increments("id");
        table.string("email").notNullable().unique();
        table.string("username").notNullable().unique();
        table.timestamps();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("user");
};
