"use strict";

module.exports.createDevice = async (event, context) => {
    // try {
    //     const body = JSON.parse(event.body);
    //     const name = body.devicename;
    //     const project = body.projectid;
    //     const user = body.userid;
    // } catch (e) {
    //     console.log("error parsing user details: ", e);
    // }

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Go Serverless v1.0! Your function executed successfully!",
            input: event,
        }),
    };
};
