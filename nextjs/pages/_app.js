import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../src/aws-exports";
Amplify.configure({
    Auth: {
        region: "us-west-1",
        userPoolId: "us-west-1_AlfXnfniu",
        userPoolWebClientId: "2qkf9sqqlf5ms7hcup7vn7mgev",
    },
});

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider theme={theme}>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default MyApp;
