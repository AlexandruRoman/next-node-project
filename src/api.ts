import { RequestHandler, Router } from "express";
import authApi from "./auth/api";
import userApi from "./user/api";
import { createRouter } from "./_helpers/api";

export default function indexApi() {
    return createRouter(
        '/',
        authApi,
        userApi
    )
}