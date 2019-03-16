import { Response, Request } from "express"
import { generateGuestToken } from "src/jwt/factory";

export default async function controller(req: Request, res: Response) {
    const token = await generateGuestToken()
    res.status(200).send(token)
}