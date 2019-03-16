import { Schema, Document, Model, model } from 'mongoose'
import { IRoleModel } from 'src/role/schema';

export interface IUser {
    name: string
    email: string
    password: string
    role: Schema.Types.ObjectId | IRoleModel
}

export interface IUserModel extends IUser, Document {
}

export let UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    }
})

export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema)