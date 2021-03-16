"use strict";

module.exports.processData = async (event, context) => {
    try {
        console.log(event);
    } catch (e) {
        console.log("Error parsing event data: ", e);
        return { statusCode: 400 };
    }
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Go Serverless v1.0! Your function executed successfully!",
            input: event,
        }),
    };
};
