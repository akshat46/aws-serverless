import { Flex, Box, Text, Button, Input, Center, Select } from "@chakra-ui/react";
import Head from "next/head";
import Sidebar from "../../components/sidebar";

export default function newDevice(props) {
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
                            <Input borderRadius="sm" mb="6" />
                            <Text mb="4" fontSize="sm">
                                Project(Optional)
                            </Text>
                            <Select variant="filled" mb="6"></Select>
                            <Button float="right" size="sm">
                                Create Device
                            </Button>
                        </Box>
                    </Center>
                </Box>
            </Flex>
        </div>
    );
}
