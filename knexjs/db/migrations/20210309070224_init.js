exports.up = function (knex) {
    return knex.schema.createTable("user", function (table) {
        table.increments("id").unique().primary();
        table.string("email").notNullable().unique();
        table.string("username").notNullable().unique();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("user");
};
