exports.up = function (knex) {
    return knex.schema.createTable("device", function (table) {
        table.increments("id").unique().primary();
        table.string("name").notNullable();
        table.integer("value1").defaultTo(0);
        table.integer("value2").defaultTo(0);
        table.string("username").notNullable().unique();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("device");
};
