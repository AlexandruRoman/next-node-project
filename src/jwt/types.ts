import { IRole } from "src/role/schema";

interface IJwtUserData {
    id?: string
    role: IRole
}

export interface IJwtData {
    user: IJwtUserData
}