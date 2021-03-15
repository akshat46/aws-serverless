import { Box, HStack, Text, Image, VStack, useDisclosure, SlideFade } from "@chakra-ui/react";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import Link from "next/link";
import { useState } from "react";
import {
    IoHardwareChipOutline,
    IoPersonOutline,
    IoPeopleOutline,
    IoBarChartOutline,
    IoMenuOutline,
    IoPowerOutline,
} from "react-icons/io5";
import SignOut from "./signout";
// import { useRouter } from "next/router";

function Sidebar(props) {
    const [isOpen, setIsOpen] = useState(true);
    const items = { profile: false, devices: false, teams: false, projects: false };
    items[props.selected] = true;
    return (
        <Box
            w={isOpen ? "250px" : "75px"}
            paddingY="6"
            transition="all 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
            paddingX="2"
            bg="brand.100"
            h="100vh">
            <SlideFade in={isOpen} offsetY="20px">
                <VStack spacing="6">
                    <SidebarItem selected={items.profile}>
                        <IoPersonOutline />
                        <Text cursor="pointer">Profile</Text>
                    </SidebarItem>
                    <SidebarItem selected={items.devices}>
                        <IoHardwareChipOutline />
                        <Link href="/devices">
                            <Text cursor="pointer">Devices</Text>
                        </Link>
                    </SidebarItem>
                    <SidebarItem selected={items.teams}>
                        <IoPeopleOutline />
                        <Text cursor="pointer">Teams</Text>
                    </SidebarItem>
                    <SidebarItem selected={items.projects}>
                        <IoBarChartOutline />
                        <Text cursor="pointer">Projects</Text>
                    </SidebarItem>
                    <SidebarItem>
                        <Box px="4" py="2" bg="gray.700" borderRadius="sm">
                            <SignOut cursor="pointer" />
                        </Box>
                    </SidebarItem>
                </VStack>
            </SlideFade>
            <Box
                ml="5"
                pos="absolute"
                bottom="6"
                left="0"
                color="brand.300"
                cursor="pointer"
                fontSize="2xl"
                onClick={() => setIsOpen(!isOpen)}>
                <IoMenuOutline />
            </Box>
        </Box>
    );
}

function SidebarItem(props) {
    return (
        <HStack
            spacing="2"
            w="100%"
            paddingX="6"
            paddingY="4"
            borderRadius="sm"
            fontWeight={props.selected ? "bold" : "normal"}
            color={props.selected ? "brand.500" : "brand.300"}>
            {props.children}
        </HStack>
    );
}

export default Sidebar;
