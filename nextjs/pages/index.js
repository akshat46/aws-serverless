import Head from "next/head";
import { Box, Button } from "@chakra-ui/react";
import Link from "next/link";
import Navbar from "../components/navbar";

export default function Home() {
    return (
        <div>
            <Head>
                <title>Alwas AI</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <Box mt="12" pos="relative" w="100%" textAlign="center">
                <Link href={`/devices`}>
                    <Button>Devices</Button>
                </Link>
            </Box>
        </div>
    );
}
