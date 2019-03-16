import IRequest from "./interface";
import { NextFunction, Response } from "express";

// const schema = {
// };

export default async function validation(req: IRequest, res: Response, next: NextFunction) {
    next()
}