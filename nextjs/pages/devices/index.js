import { Flex, Box, SimpleGrid, HStack, Button, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Amplify, { Auth, PubSub } from "aws-amplify";
import { AWSIoTProvider } from "@aws-amplify/pubsub";
import Head from "next/head";
import Link from "next/link";
import Device from "../../components/device";
import Sidebar from "../../components/sidebar";
import { IoAdd, IoSearch } from "react-icons/io5";
Amplify.configure({
    Auth: {
        region: "us-west-1",
        userPoolId: "us-west-1_hVPi0ltOi",
        userPoolWebClientId: "1m60prfmnfjppelnefads7is6e",
    },
});
Amplify.addPluggable(
    new AWSIoTProvider({
        aws_pubsub_region: "us-west-1",
        aws_pubsub_endpoint: "wss://a3daefqumkhkp3-ats.iot.us-west-1.amazonaws.com/mqtt",
    })
);

PubSub.configure();

export default function Devices({ data }) {
    let [user, setUser] = useState();
    let [devices, setDevices] = useState([]);
    let router = useRouter();
    useEffect(() => {
        PubSub.subscribe("device_data").subscribe({
            next: (data) => console.log("Message received", data),
            error: (error) => console.error(error),
            close: () => console.log("Done"),
        });
        if (user === undefined) {
            setDevices(data);
            Auth.currentAuthenticatedUser({
                bypassCache: false,
            })
                .then((u) => {
                    setUser(u);
                })
                .catch((err) => router.push("/authentication"));
        }
    });
    return (
        <div>
            <Head>
                <title>Alwas AI</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {user !== undefined && (
                <Flex>
                    <Sidebar selected="devices" />
                    <Box p="12" w="100%">
                        <Box m="4" w="100%" h="50px">
                            <Link href="/devices/new">
                                <Button float="right" leftIcon={<IoAdd />}>
                                    New Device
                                </Button>
                            </Link>
                        </Box>
                        <Flex flexDirection="row" flexWrap="wrap" spacing="6">
                            {devices.length === 0 ? (
                                <Text fontSize="2xl" m="20% auto" color="gray.400">
                                    You have no devices.
                                </Text>
                            ) : (
                                devices.map((d) => <Device name={d.name} value2={d.value2} value1={d.value1} />)
                            )}
                        </Flex>
                    </Box>
                </Flex>
            )}
        </div>
    );
}

export async function getServerSideProps(context) {
    const username = context.query.uid;
    const url = `https://mdv1fy6vid.execute-api.us-west-1.amazonaws.com/devices/byuser/?uid=${username}`;
    const res = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors",
    });
    const data = await res.json();
    if (!data) {
        return {
            notFound: true,
        };
    }
    // const data = res.body);
    return { props: { data: data.devices } };
}
