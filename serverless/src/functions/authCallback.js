"use strict";

module.exports.createUser = async (event, context, callback) => {
    let username = event.username;
    let email = event.email;
    event.response.autoConfirmUser = true;
    event.response.autoVerifyEmail = true;
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Go Serverless v1.0! Your function executed successfully!",
            input: event,
        }),
    };
};
