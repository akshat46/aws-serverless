"use strict";
var Knex = require("knex");

module.exports.createUser = (event, context, callback) => {
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
        if (event.response === undefined) throw "Error parsing event. No `response`.";
        console.log("response found");
        event.response.autoConfirmUser = true;
        event.response.autoVerifyEmail = true;
        console.log("response set");
        knex("user")
            .insert({ username: event.userName, email: event.request.userAttributes.email })
            .then(() => console.log("data inserted"))
            .catch((err) => {
                console.log(err);
                throw err;
            })
            .finally(() => {
                knex.destroy();
            });
    } catch (e) {
        console.log("Error: ", e);
        knex.destroy();
        callback(e);
    }
    callback(null, event);
};
