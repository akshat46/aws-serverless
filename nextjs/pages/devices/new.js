import { Flex, Box, Text, Button, Input, Center, Select } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Amplify, { Auth } from "aws-amplify";
import Head from "next/head";
import Sidebar from "../../components/sidebar";
const url = "https://3tihgcqv1c.execute-api.us-west-1.amazonaws.com/dev/devices/create";
Amplify.configure({
    Auth: {
        region: "us-west-1",
        userPoolId: "us-west-1_hVPi0ltOi",
        userPoolWebClientId: "1m60prfmnfjppelnefads7is6e",
    },
});

export default function newDevice(props) {
    let [user, setUser] = useState();
    let [name, setName] = useState();
    let router = useRouter();
    useEffect(() => {
        if (user === undefined) {
            Auth.currentAuthenticatedUser({
                bypassCache: false,
            })
                .then((u) => setUser(u))
                .catch((err) => router.push("/authentication"));
        }
    });
    let submit = async () => {
        console.log("submitting:", name, " ", user.username);
        try {
            const response = await fetch(url, {
                method: "PUT",
                body: JSON.stringify({
                    devicename: name,
                    username: user.username,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "cors",
            });
            console.log(response);
        } catch (e) {
            console.log("err: ", e);
        }
    };
    return (
        <div>
            <Head>
                <title>Alwas AI</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Flex>
                <Sidebar />
                <Box p="12" w="100%">
                    <Center>
                        <Box w="350px" p="6">
                            <Text textAlign="center" fontSize="2xl" mb="8" color="brand.400" fontWeight="bold">
                                New Device
                            </Text>
                            <Text mb="4" fontSize="sm">
                                Name
                            </Text>
                            <Input borderRadius="sm" mb="6" value={name} onChange={(e) => setName(e.target.value)} />
                            <Text mb="4" fontSize="sm">
                                Project(Optional)
                            </Text>
                            <Select variant="filled" mb="6" disabled></Select>
                            <Button float="right" size="sm" onClick={() => submit()}>
                                Create Device
                            </Button>
                        </Box>
                    </Center>
                </Box>
            </Flex>
        </div>
    );
}
