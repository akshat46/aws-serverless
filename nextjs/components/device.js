import { Box, Text, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import Link from "next/link";

function Device(props) {
    return (
        <Link href={`/devices/${props.name}?value1=${props.value1}&value2=${props.value2}`}>
            <Box w="200px" cursor="pointer" m="4" borderRadius="sm" bg="white" color="brand.900" boxShadow="sm" p="6">
                <Text mb="4" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">
                    {props.name}
                </Text>
                <Stat size="md" color="green.300" mr="4" textAlign="left" display="inline-block">
                    <StatLabel>Value1</StatLabel>
                    <StatNumber>{props.value1}</StatNumber>
                </Stat>
                <Stat size="md" color="purple.300" textAlign="left" display="inline-block">
                    <StatLabel>Value2</StatLabel>
                    <StatNumber>{props.value2}</StatNumber>
                </Stat>
            </Box>
        </Link>
    );
}

export default Device;
