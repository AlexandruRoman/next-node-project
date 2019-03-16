import { Response } from "express"
import IRequest from './interface'
import { generateUserToken } from "src/jwt/factory";

export default async function controller(req: IRequest, res: Response) {
    const user = req.user
    const token = generateUserToken(user)
    res.status(200).send(token)
}