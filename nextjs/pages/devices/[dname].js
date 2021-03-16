import AWS from "aws-sdk/global";
import AWSMqttClient from "aws-mqtt";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Device from "../../components/device";
import Sidebar from "../../components/sidebar";
import { Flex, Box, Text, Stat, StatLabel, StatNumber, Divider } from "@chakra-ui/react";
AWS.config.region = "us-west-1";
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "us-west-1:538d33c1-838e-4b4d-925b-a45019d4d1a3",
});
export default function ShowDevice({ data }) {
    let router = useRouter();
    let [device, setDevice] = useState(data);
    useEffect(() => {
        const client = new AWSMqttClient({
            region: AWS.config.region,
            credentials: AWS.config.credentials,
            endpoint: "a3daefqumkhkp3-ats.iot.us-west-1.amazonaws.com",
        });
        client.on("connect", () => {
            client.subscribe("device_data");
        });
        client.on("message", (topic, message) => {
            var msg = new TextDecoder("utf-8").decode(message);
            var obj = JSON.parse(msg);
            if (obj.name === device.name) {
                setDevice(obj);
            } else console.log("incoming device:", obj);
        });
        client.on("close", () => {
            console.log("closed");
        });
    });
    return (
        <div>
            <Flex>
                <Sidebar />
                <Box p="12" w="100%">
                    <Box
                        w="80%"
                        cursor="pointer"
                        m="0 auto"
                        borderRadius="sm"
                        bg="white"
                        color="brand.900"
                        boxShadow="sm"
                        p="6">
                        <Text
                            mb="4"
                            textOverflow="ellipsis"
                            fontSize="4xl"
                            fontWeight="bold"
                            overflow="hidden"
                            whiteSpace="nowrap">
                            {device.name}
                        </Text>
                        <Divider mb="8" />
                        <Stat size="md" color="green.300" mr="8" textAlign="left" display="inline-block">
                            <StatLabel>Value1</StatLabel>
                            <StatNumber>{device.value1}</StatNumber>
                        </Stat>
                        <Stat size="md" color="purple.300" textAlign="left" display="inline-block">
                            <StatLabel>Value2</StatLabel>
                            <StatNumber>{device.value2}</StatNumber>
                        </Stat>
                    </Box>
                </Box>
            </Flex>
        </div>
    );
}
export async function getServerSideProps(context) {
    let data = {
        name: context.query.dname,
        value1: context.query.value1,
        value2: context.query.value2,
    };
    if (!data) return { notFound: true };
    return { props: { data } };
}
