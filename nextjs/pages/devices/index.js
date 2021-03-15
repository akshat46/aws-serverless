import { Flex, Box, SimpleGrid, HStack, Button, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Amplify, { Auth } from "aws-amplify";
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

export default function Devices() {
    let [user, setUser] = useState();
    useEffect(() => {
        Auth.currentAuthenticatedUser({
            bypassCache: false,
        })
            .then((user) => setUser(user))
            .catch((err) => console.log("currentAuthenticatedUser", err));
    });
    return (
        <div>
            <Head>
                <title>Alwas AI</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {user !== undefined ? (
                <Flex>
                    <Sidebar selected="devices" />
                    <Box p="12" w="100%">
                        <Box m="4" w="100%" h="50px">
                            <InputGroup w="200px" color="brand.300" float="left">
                                <InputLeftElement pointerEvents="none" children={<IoSearch />} />
                                <Input bg="brand.100" variant="filled" borderRadius="sm" />
                            </InputGroup>
                            <Link href="/devices/new">
                                <Button float="right" leftIcon={<IoAdd />}>
                                    New Device
                                </Button>
                            </Link>
                        </Box>
                        <Flex flexDirection="row" flexWrap="wrap" spacing="6">
                            <Device name="Device11" />
                            <Device name="Device11" />
                        </Flex>
                    </Box>
                </Flex>
            ) : (
                <>
                    <Text fontSize="2xl">Not logged in.</Text>
                    <Link href="/authentication">
                        <Text color="blue.400" cursor="pointer">
                            Log in
                        </Text>
                    </Link>
                </>
            )}
        </div>
    );
}
