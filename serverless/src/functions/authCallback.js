"use strict";
var Knex = require("knex");

module.exports.createUser = (event, context, callback) => {
    console.log("received event:", event);
    var knex = Knex({
        client: "postgresql",
        connection: {
            host: process.env.RDSHost,
            database: process.env.RDSName,
            user: process.env.RDSUser,
            password: process.env.RDSPassword,
        },
        pool: {
            min: 2,
            max: 10,
        },
    });
    try {
        if (event.response === undefined) throw "Error parsing event. No `response`.";
        event.response.autoConfirmUser = true;
        event.response.autoVerifyEmail = true;
        knex("user").insert({ username: event.username, email: event.email });
        knex.destroy();
    } catch (e) {
        console.log("Error: ", e);
        knex.destroy();
        callback(e);
    }
    callback(null, event);
};
