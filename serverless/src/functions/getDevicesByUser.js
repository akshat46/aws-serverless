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
        // knex("user")
        //     .where({ username: username })
        //     .select("id")
        //     .then((data) => {
        //         knex("user_to_devices")
        //             .where({ user_id: data[0].id })
        //             .select("device_id")
        //             .then((data) => {
        //                 let arr = data.map((d) => d.device_id);
        //                 knex.select("*")
        //                     .from("device")
        //                     .whereIn("id", arr)
        //                     .then((data) => console.log("final devices:", data));
        //             });
        //     });
    } catch (e) {
        console.log("Error: ", e);
        knex.destroy();
        // callback({
        //     statusCode: 400,
        //     body: JSON.stringify({ message: e }),
        //     headers: {
        //         "Access-Control-Allow-Origin": "*",
        //         "Access-Control-Allow-Methods": "GET",
        //         "Content-Type": "application/json",
        //     },
        // });
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

    // callback(null, {
    //     statusCode: 200,
    //     body: JSON.stringify({ message: "device created" }),
    //     headers: {
    //         "Access-Control-Allow-Origin": "*",
    //         "Access-Control-Allow-Methods": "GET",
    //         "Content-Type": "application/json",
    //     },
    // });
    return {
        statusCode: 204,
        body: JSON.stringify({ message: "no devices" }),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Content-Type": "application/json",
        },
    };
};
