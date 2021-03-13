import { Flex, Spacer, HStack, Text, Image, Box } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

function Navbar(props) {
    const textColor = props.dark ? "white" : "black";
    const textSelectedColor = props.dark ? "brand.300" : "brand.500";
    const router = useRouter();
    return (
        <Flex h="100px" paddingX="16" paddingY="4" color={textColor} mb="8">
            <Image h="60px" src="/logo.svg" />
            <Spacer />
            <HStack spacing="6">
                <Text cursor="pointer">Products</Text>
                <Text cursor="pointer">Use Cases</Text>
                <Text cursor="pointer" color={textSelectedColor}>
                    Pricing
                </Text>
                <Text cursor="pointer">Blog</Text>
                <Text cursor="pointer">Support</Text>
            </HStack>
            <Spacer />
            <HStack spacing="6">
                <Text cursor="pointer">Models</Text>
                <Text cursor="pointer">Docs</Text>
                <Link href="/authentication">
                    <Text cursor="pointer">Log in</Text>
                </Link>
            </HStack>
        </Flex>
    );
}

export default Navbar;
