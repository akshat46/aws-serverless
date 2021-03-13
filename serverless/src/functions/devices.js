"use strict";

module.exports.createDevice = async (event, context) => {
    const body = JSON.parse(event.body);
    const name = body.devicename;
    const project = body.projectid;
    const user = body.userid;

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Go Serverless v1.0! Your function executed successfully!",
            input: event,
        }),
    };
};
