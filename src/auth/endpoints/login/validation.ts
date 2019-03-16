import IRequest from "./interface";
import { NextFunction, Response } from "express";
import * as Joi from 'joi'
import * as bcrypt from 'bcrypt'
import { getUserWithPermissions } from "src/user/dal";

const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
};

export default async function validation(req: IRequest, res: Response, next: NextFunction) {
    const validation = Joi.validate(req.body, schema)
    if (validation.error)
        return res.status(400).send(validation.error)

    let user = await getUserWithPermissions({ email: req.body.email })
    if (!user)
        return res.status(400).send('Invalid email.')

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword)
        return res.status(400).send('Wrong password.')

    req.user = user
    next()
}