import authApi from "./identity/auth/api";
import { createRouter } from "./_helpers/api";

export default function indexApi() {
    return createRouter(
        '/',
        authApi
    )
}
