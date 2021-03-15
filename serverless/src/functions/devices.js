"use strict";
var Knex = require("knex");

module.exports.createDevice = (event, context, callback) => {
    console.log("received event: ", event);
    // create knex object
    var knex = Knex({
        client: "postgresql",
        connection: {
            host: process.env.RDS_HOST,
            database: process.env.RDS_DB,
            user: process.env.RDS_USER,
            password: process.env.RDS_PSSWD,
        },
        pool: {
            min: 2,
            max: 10,
        },
    });
    try {
        const body = JSON.parse(event.body);
        const { devicename: name, username } = body;
        // skipping optional project
        knex("device")
            .insert({ name: name, username: username })
            .then(() => console.log("data inserted"))
            .catch((err) => {
                console.log(err);
                throw err;
            })
            .finally(() => {
                knex.destroy();
            });
        console.log("received name:", name, ", user:", username);
    } catch (e) {
        console.log("Error: ", e);
        knex.destroy();
        callback(e);
    }

    callback(null, event);
};
