import authLoginEndpoint from "./endpoints/login/api";
import authSignupEndpoint from "./endpoints/signup/api";
import { createRouter } from "src/_helpers/api";
import authGuestEndpoint from "./endpoints/guest/api";

export default function authApi() {
    return createRouter(
        '/auth',
        authLoginEndpoint,
        authSignupEndpoint,
        authGuestEndpoint
    )
}