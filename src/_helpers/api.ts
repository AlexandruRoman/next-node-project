import { Router, NextFunction, Response, Request } from "express";
import * as jwt from 'jsonwebtoken'
import { IJwtData } from "src/jwt/types";
import { IPermissionModel } from "src/identity/permission/schema";
import { Schema } from "mongoose";

export type RouterWrapper = () => Router

export function createRouter(route: string, ...endpoints: RouterWrapper[]): Router {
    const router = Router()
    for (let endpoint of endpoints)
        router.use(route, endpoint())
    return router
}

export function checkPermission(permissionName: string) {
    return async function (req: IPermissionRequest, res: Response, next: NextFunction) {
        const token = req.header('x-auth-token')
        if (!token) return res.status(401).send('Access denied. No token provided.')

        try {
            const decoded = jwt.verify(token, "jwt_cheiePrivata")
            req.jwtData = decoded as IJwtData
            const hasAccess = req.jwtData.user.role.permissions
                .find((x: IPermissionModel | Schema.Types.ObjectId) => (x as IPermissionModel).name === permissionName)
            if (!hasAccess)
                return res.status(403).send('Forbidden access.')
            next()
        }
        catch (ex) {
            res.status(400).send('Invalid token.')
        }
    }
}

export interface IPermissionRequest extends Request {
    jwtData: IJwtData
}