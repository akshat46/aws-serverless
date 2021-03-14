const highlight = require("cli-highlight").highlight;
let awsIot = require("aws-iot-device-sdk");
let device = awsIot.device({
    keyPath: "certs/private.pem.key",
    certPath: "certs/thing-certificate.pem.crt",
    caPath: "certs/root-ca.pem",
    clientId: "alwaysai-mock-device",
    host: "a3daefqumkhkp3-ats.iot.us-west-1.amazonaws.com",
});
let args = process.argv.slice(2);
let rules = false;

if (args.length === 0) {
    args[0] = "device1";
    console.log("No device name specified, using name: device1\n");
    args.includes("--rules");
}

try {
    device.on("connect", function () {
        console.log("connect\n");
        // initial test
        device.subscribe("trigger");
        device.publish("trigger", JSON.stringify({ hello_world: "Testing triggers..." }));
        device.subscribe("device_data");
        args.forEach((name) => generateData(name, device));
    });
} catch (error) {
    console.error("error with subscription.\n", error);
}

try {
    device.on("message", function (topic, message) {
        console.log("***************************\n");
        console.log("message from topic:", topic, "\n");
        console.log(highlight(message.toString()), "\n");
    });
} catch (error) {
    console.error("error recieving message.\n", error);
}

function generateData(name, device) {
    let value1 = Math.round(Math.random() * 100);
    let value2 = Math.round(Math.random() * 100);

    // update value1 every 2 seconds
    setInterval(function () {
        value1 = Math.round(Math.random() * 100);
        device.publish("device_data", JSON.stringify({ name: name, value1: value1, value2, value2 }));
    }, 2000);
    // update value2 every 6 seconds
    setInterval(function () {
        value2 = Math.round(Math.random() * 100);
        device.publish("device_data", JSON.stringify({ name: name, value1: value1, value2, value2 }));
    }, 6000);
}
