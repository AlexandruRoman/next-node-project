import { Router } from "express";
import validation from './validation'
import controller from './controller'

export default function authSignupEndpoint() {
    const router = Router()
    router.post(
        '/signup',
        validation,
        controller
    )
    return router
}