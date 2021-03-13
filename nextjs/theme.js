import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    colors: {
        brand: {
            bg: "#F7F9FA",
            100: "#FFE4E4",
            200: "#FFBCBC",
            300: "#FF7C83",
            400: "#F2303A",
            500: "#C92C56",
            600: "#9A242B",
            700: "#570025",
            800: "#331B25",
            900: "#000000",
        },
    },
    components: {
        Button: {
            baseStyle: {
                fontWeight: "bold",
                color: "white",
                borderRadius: "sm",
            },
            defaultProps: {
                colorScheme: "brand",
            },
        },
        Input: {
            baseStyle: {
                borderRadius: "sm",
            },
            variants: {
                filled: {
                    bg: "brand.100",
                    color: "brand.300",
                },
            },
            defaultProps: {
                variant: "filled",
            },
        },
    },
    styles: {
        global: {
            // styles for the `body`
            body: {
                bg: "#F7F9FA",
                color: "black",
            },
            // styles for the `a`
            a: {
                color: "#C92C56",
                _hover: {
                    textDecoration: "underline",
                },
            },
        },
    },
});

export default theme;
