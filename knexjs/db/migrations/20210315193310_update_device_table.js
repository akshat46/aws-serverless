exports.up = function (knex) {
    return knex.schema.table("device", function (table) {
        table.dropColumn("username");
    });
};

exports.down = function (knex) {
    return knex.schema.table("device", function (table) {
        table.string("username").notNullable().unique();
    });
};
