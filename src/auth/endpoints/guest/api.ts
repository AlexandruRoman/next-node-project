import { Router } from "express";
import controller from './controller'

export default function authGuestEndpoint() {
    const router = Router()
    router.get(
        '/guest',
        controller
    )
    return router
}