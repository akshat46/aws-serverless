import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
const Authentication = () => (
    <div>
        <AmplifySignOut />
        My App
    </div>
);

export default withAuthenticator(Authentication);
