import { useState, useEffect } from "react";
import { withAuthenticator, AmplifyAuthenticator, AmplifySignUp, AmplifySignOut } from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";

// src to hide email,phone fields for signup:
// https://docs.amplify.aws/ui/auth/authenticator/q/framework/react#hiding-form-fields
const Authentication = () => {
    const [authState, setAuthState] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData);
        });
    }, []);

    return authState === AuthState.SignedIn && user ? (
        <div className="App">
            <div>Hello, {user.username}</div>
            <AmplifySignOut />
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
