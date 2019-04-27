import { Request } from "express";
import { IJwtData } from "src/jwt/types";

export interface IPermissionRequest extends Request {
    jwtData: IJwtData
}