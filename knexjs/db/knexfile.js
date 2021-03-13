// Update with your config settings.

module.exports = {
    development: {
        client: "postgresql",
        connection: {
            host: "psdb-1.cl8bjlmtaoxv.us-east-2.rds.amazonaws.com",
            database: "postgres",
            user: "postgres",
            password: "PostgresQL?",
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
};
