import { useState, useEffect } from "react";
import Link from "next/link";
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignOut } from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import { useRouter } from "next/router";
import { Box, Button } from "@chakra-ui/react";

// src to hide email,phone fields for signup:
// https://docs.amplify.aws/ui/auth/authenticator/q/framework/react#hiding-form-fields
const Authentication = () => {
    const [authState, setAuthState] = useState();
    const [user, setUser] = useState();
    let router = useRouter();

    useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData);
            console.log("authstate: ", nextAuthState);
        });
    }, []);

    return authState === AuthState.SignedIn && user ? (
        <div className="App">
            <div>Hello, {user.username}</div>
            <AmplifySignOut />
            <Box mt="12" pos="relative" w="100%" textAlign="center">
                <Link href={`/devices?uid=${user.username}`}>
                    <Button>Devices</Button>
                </Link>
            </Box>
        </div>
    ) : (
        <AmplifyAuthenticator>
            <AmplifySignUp
                slot="sign-up"
                formFields={[{ type: "username" }, { type: "password" }, { type: "email" }]}
            />
        </AmplifyAuthenticator>
    );
};

export default Authentication;
