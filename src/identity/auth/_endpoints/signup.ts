import { Router, NextFunction, Response } from 'express'
import { IUserModel, User } from 'src/identity/user/schema'
import * as Joi from 'joi'
import * as bcrypt from 'bcrypt'
import { Role } from 'src/identity/role/schema'
import ROLE_LIST from 'src/identity/role/list'
import { IPermissionRequest } from 'src/_helpers/api'

/*
 *         ___      .______    __
 *        /   \     |   _  \  |  |
 *       /  ^  \    |  |_)  | |  |
 *      /  /_\  \   |   ___/  |  |
 *     /  _____  \  |  |      |  |
 *    /__/     \__\ | _|      |__|
 */

export default function authEndpoint_signup() {
    const router = Router()
    router.post('/signup', validation, controller)
    return router
}

/*
 *    ____    ____  ___       __       __   _______       ___   .___________. __    ______   .__   __.
 *    \   \  /   / /   \     |  |     |  | |       \     /   \  |           ||  |  /  __  \  |  \ |  |
 *     \   \/   / /  ^  \    |  |     |  | |  .--.  |   /  ^  \ `---|  |----`|  | |  |  |  | |   \|  |
 *      \      / /  /_\  \   |  |     |  | |  |  |  |  /  /_\  \    |  |     |  | |  |  |  | |  . `  |
 *       \    / /  _____  \  |  `----.|  | |  '--'  | /  _____  \   |  |     |  | |  `--'  | |  |\   |
 *        \__/ /__/     \__\ |_______||__| |_______/ /__/     \__\  |__|     |__|  \______/  |__| \__|
 */

const schema = {
    email: Joi.string()
        .min(5)
        .max(255)
        .required()
        .email(),
    name: Joi.string()
        .min(2)
        .max(255)
        .required(),
    password: Joi.string()
        .min(8)
        .max(255)
        .required(),
    role: Joi.string().required()
}

async function validation(req: IRequest, res: Response, next: NextFunction) {
    const validation = Joi.validate(req.body, schema)
    if (validation.error) return res.status(400).send(validation.error)
    if (req.body.role != ROLE_LIST.CLIENT && req.body.role != ROLE_LIST.SELLER)
        return res.status(400).send(`Role must be ${ROLE_LIST.CLIENT} or ${ROLE_LIST.SELLER}.`)
    next()
}

/*
 *      ______   ______   .__   __. .___________..______      ______    __       __       _______ .______
 *     /      | /  __  \  |  \ |  | |           ||   _  \    /  __  \  |  |     |  |     |   ____||   _  \
 *    |  ,----'|  |  |  | |   \|  | `---|  |----`|  |_)  |  |  |  |  | |  |     |  |     |  |__   |  |_)  |
 *    |  |     |  |  |  | |  . `  |     |  |     |      /   |  |  |  | |  |     |  |     |   __|  |      /
 *    |  `----.|  `--'  | |  |\   |     |  |     |  |\  \--.|  `--'  | |  `----.|  `----.|  |____ |  |\  \--.
 *     \______| \______/  |__| \__|     |__|     | _| `.___| \______/  |_______||_______||_______|| _| `.___|
 */

async function controller(req: IRequest, res: Response) {
    try {
        const role = await Role.findOne({ name: req.body.role })
        const { name, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role: role.id
        })
        await user.validate()
        await user.save()
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).send(error)
    }
}

/*
 *    .___________.____    ____ .______    _______     _______.
 *    |           |\   \  /   / |   _  \  |   ____|   /       |
 *    `---|  |----` \   \/   /  |  |_)  | |  |__     |   (----`
 *        |  |       \_    _/   |   ___/  |   __|     \   \
 *        |  |         |  |     |  |      |  |____.----)   |
 *        |__|         |__|     | _|      |_______|_______/
 */

interface IBody {
    name: string
    email: string
    password: string
    role: string
}

interface IRequest extends IPermissionRequest {
    user: IUserModel
    body: IBody
}
