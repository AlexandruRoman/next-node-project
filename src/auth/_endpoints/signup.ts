import { Router, NextFunction, Response } from "express";
import { IPermissionRequest } from "src/permission/types";
import { IUserModel, User } from "src/user/schema";
import * as Joi from 'joi'
import * as bcrypt from 'bcrypt'
import { Role } from "src/role/schema";
import ROLE_LIST from "src/role/list";

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
    router.post(
        '/signup',
        validation,
        controller
    )
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
    email: Joi.string().min(5).max(255).required().email(),
    name: Joi.string().min(2).max(255).required(),
    password: Joi.string().min(8).max(255).required()
}

async function validation(req: IRequest, res: Response, next: NextFunction) {
    const validation = Joi.validate(req.body, schema)
    if (validation.error)
        return res.status(400).send(validation.error)
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
        const role = await Role.findOne({ name: ROLE_LIST.CLIENT })
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
}

interface IRequest extends IPermissionRequest {
    user: IUserModel
    body: IBody
}

