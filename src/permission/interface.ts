import { Request } from "express";
import { IJwtData } from "src/jwt/interface";

export interface IPermissionRequest extends Request {
    jwtData: IJwtData
}