import { IUserModel } from "src/user/schema";
import { IJwtData } from "./interface";
import * as jwt from 'jsonwebtoken'
import { IRole } from "src/role/schema";
import { ROLE } from "src/role/list";
import { getRoleWithPermissions } from "src/role/dal";

export function generateUserToken(user: IUserModel) {
    const role: IRole = {
        name: (user.role as IRole).name,
        permissions: (user.role as IRole).permissions,
    }
    const jwtData: IJwtData = {
        user: {
            id: user.id,
            role
        }
    }
    return jwt.sign(jwtData, 'jwt_cheiePrivata')
}

export async function generateGuestToken() {
    const role = await getRoleWithPermissions({ name: ROLE.GUEST })
    const jwtData: IJwtData = {
        user: {
            role: {
                name: role.name,
                permissions: role.permissions
            }
        }
    }
    return jwt.sign(jwtData, 'jwt_cheiePrivata')
}