import { IUserModel } from "src/user/schema";
import { IPermissionRequest } from "src/permission/interface";

interface IBody {
    email: string
    password: string
}

export default interface IRequest extends IPermissionRequest {
    user: IUserModel
    body: IBody
}