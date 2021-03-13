import { Box, Text } from "@chakra-ui/react";

function Device(props) {
    return (
        <Box
            w="200px"
            cursor="pointer"
            m="4"
            textAlign="center"
            h="80px"
            borderRadius="sm"
            bg="white"
            color="brand.500"
            boxShadow="sm"
            p="6">
            <Text textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">
                {props.name}
            </Text>
        </Box>
    );
}

export default Device;
