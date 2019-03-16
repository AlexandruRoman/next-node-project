import IRequest from "./interface";
import { NextFunction, Response } from "express";
import * as Joi from 'joi'

const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    name: Joi.string().min(2).max(255).required(),
    password: Joi.string().min(8).max(255).required()
}

export default async function validation(req: IRequest, res: Response, next: NextFunction) {
    const validation = Joi.validate(req.body, schema)
    if (validation.error)
        return res.status(400).send(validation.error)
    next()
}