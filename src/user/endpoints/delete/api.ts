import { Router } from "express";
import validation from './validation'
import controller from './controller'
import checkPermission from "src/permission/middleware";
import PERMISSION from "src/permission/list";

export default function userDeleteEndpoint() {
    const router = Router()
    router.delete(
        '/delete',
        checkPermission(PERMISSION.MANAGE_ROLES),
        validation,
        controller
    )
    return router
}