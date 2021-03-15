exports.up = function (knex) {
    return knex.schema.createTable("user_to_devices", function (table) {
        table.integer("user_id").notNullable();
        table.foreign("user_id").references("user.id").onDelete("CASCADE");
        table.integer("device_id").notNullable().unique().primary();
        table.foreign("device_id").references("device.id").onDelete("NO ACTION");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("user_to_devices");
};
