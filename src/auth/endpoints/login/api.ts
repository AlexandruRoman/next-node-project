import { Router } from "express";
import validation from './validation'
import controller from './controller'

export default function authLoginEndpoint() {
    const router = Router()
    router.post(
        '/login',
        validation,
        controller
    )
    return router
}