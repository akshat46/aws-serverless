import { Text } from "@chakra-ui/react";
import Amplify, { Auth } from "aws-amplify";
import { useRouter } from "next/router";
Amplify.configure({
    Auth: {
        region: "us-west-1",
        userPoolId: "us-west-1_hVPi0ltOi",
        userPoolWebClientId: "1m60prfmnfjppelnefads7is6e",
    },
});

export default function SignOut(props) {
    let router = useRouter();
    return (
        <Text
            onClick={() => {
                Auth.signOut();
                router.push("/authentication");
            }}
            {...props}>
            Logout
        </Text>
    );
}
