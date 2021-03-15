"use strict";
var Knex = require("knex");

module.exports.createDevice = (event, context, callback) => {
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
        Promise.allSettled([
            knex("device").insert({ name: name }).returning("id"),
            knex("user").where({ username: username }).select("id"),
        ]).then((res) => {
            // res format => [
            //    {status: x, value: [device_id]},
            //    {status: x, value: [{id: user_id}]}
            //]
            knex("user_to_devices")
                .insert({ device_id: res[0].value[0], user_id: res[1].value[0].id })
                .then(() => {
                    console.log("added to user_to_devices");
                })
                .finally(() => knex.destroy());
        });
    } catch (e) {
        console.log("Error: ", e);
        knex.destroy();
        callback(e);
    }

    callback(null, { statusCode: 200, body: JSON.stringify({ message: "device created" }) });
};
