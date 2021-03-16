"use strict";
var Knex = require("knex");

// get devices by specific user
module.exports.getDevicesByUser = async (event, context) => {
    console.log("received event:", event);
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
        const username = event.queryStringParameters.uid;
        let user_id = await knex("user").where({ username: username }).select("id");
        let device_id = await knex("user_to_devices").where({ user_id: user_id[0].id }).select("device_id");
        let arr = device_id.map((d) => d.device_id);
        let devices = await knex.select("*").from("device").whereIn("id", arr);
        console.log("final devices:", devices);
        return {
            statusCode: 200,
            body: JSON.stringify({ devices: devices }),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
                "Content-Type": "application/json",
            },
        };
    } catch (e) {
        console.log("Error: ", e);
        knex.destroy();
        return {
            statusCode: 400,
            body: JSON.stringify({ message: e }),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
                "Content-Type": "application/json",
            },
        };
    }
};
