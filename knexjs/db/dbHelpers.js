// elegant column dropping
// https://github.com/knex/knex/issues/1091#issuecomment-685154761
const dropColumn = (knex, tableName, columnName) => {
    // knex does not have a dropColumnIfExists :\
    return knex.schema.hasColumn(tableName, columnName).then((hasColumn) => {
        if (hasColumn) {
            return knex.schema.alterTable(tableName, (table) => {
                table.dropColumn(columnName);
            });
        } else {
            return null;
        }
    });
};

module.exports = { dropColumn };
