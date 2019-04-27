import { IUserModel } from "src/identity/user/schema";
import { IJwtData } from "./types";
import * as jwt from 'jsonwebtoken'
import { IRole } from "src/identity/role/schema";
import ROLE_LIST from "src/identity/role/list";
import { roleDal_getRoleWithPermissions } from "src/identity/role/dal";

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
    const role = await roleDal_getRoleWithPermissions({ name: ROLE_LIST.GUEST })
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