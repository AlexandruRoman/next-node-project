import { createRouter } from "src/_helpers/api";
import authEndpoint_guest from "./_endpoints/guest";
import authEndpoint_login from "./_endpoints/login";
import authEndpoint_signup from "./_endpoints/signup";

export default function authApi() {
    return createRouter(
        '/auth',
        authEndpoint_guest,
        authEndpoint_login,
        authEndpoint_signup
    )
}