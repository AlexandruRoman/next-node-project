import { IRole } from "src/identity/role/schema";

interface IJwtUserData {
    id?: string
    role: IRole
}

export interface IJwtData {
    user: IJwtUserData
}