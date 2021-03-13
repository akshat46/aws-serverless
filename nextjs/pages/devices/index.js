import { Flex, Box, SimpleGrid, HStack, Button, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import Device from "../../components/device";
import Sidebar from "../../components/sidebar";
import { IoAdd, IoSearch } from "react-icons/io5";

export default function Devices() {
    return (
        <div>
            <Head>
                <title>Alwas AI</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
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
        </div>
    );
}
