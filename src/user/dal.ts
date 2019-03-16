import { User } from "./schema";

export function getUserWithPermissions(conditions: any) {
    return User.findOne(conditions).populate({
        path: 'role',
        populate: { path: 'permissions' }
    })
}