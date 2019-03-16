import { Role } from "./schema";

export function getRoleWithPermissions(conditions: any) {
    return Role.findOne(conditions).populate('permissions')
}