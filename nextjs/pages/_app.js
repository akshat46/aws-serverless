import "../styles/globals.css";
import Amplify, { Auth } from "aws-amplify";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
Amplify.configure({
    Auth: {
        region: "us-west-1",
        userPoolId: "us-west-1_hVPi0ltOi",
        userPoolWebClientId: "1m60prfmnfjppelnefads7is6e",
    },
});

function MyApp({ Component, pageProps }) {
    // Auth.currentSession()
    //     .then((data) => console.log("currentSession:", data))
    //     .catch((err) => console.log("currentSession:", err));
    return (
        <ChakraProvider theme={theme}>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default MyApp;
