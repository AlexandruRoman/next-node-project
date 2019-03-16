import { Response } from "express"
import IRequest from './interface'

export default async function controller(req: IRequest, res: Response) {
    console.log("delete")
    return res.status(200).send('deleted')
}