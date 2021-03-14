"use strict";

module.exports.processData = async (event, context) => {
    try {
        let name = event.name;
        let value1 = event.value1;
        let value2 = event.value2;
    } catch (e) {
        console.log("Error parsing event data: ", e);
    }
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Go Serverless v1.0! Your function executed successfully!",
            input: event,
        }),
    };
};
