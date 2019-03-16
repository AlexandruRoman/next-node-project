import userDeleteEndpoint from "./endpoints/delete/api";
import { createRouter } from "src/_helpers/api";

export default function userApi() {
    return createRouter(
        '/user',
        userDeleteEndpoint
    )
}