import { Router } from "express";

export type RouterWrapper = () => Router

export function createRouter(route: string, ...endpoints: RouterWrapper[]): Router {
    const router = Router()
    for (let endpoint of endpoints)
        router.use(route, endpoint())
    return router
}
