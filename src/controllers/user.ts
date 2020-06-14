import { Router, Application, Request, Response, NextFunction } from 'express';
import Joi from '@hapi/joi';
import bcrypt from 'bcrypt';
import { getHashedPassword } from '../helpers/helpers';
import { JWT_SECRET, STATUS_CODE_ERROR, STATUS_CODE_SUCCESS } from '../helpers/constants';
import jwt from 'jsonwebtoken';

import { userSchema, IUser } from '../models/user';
import { cartSchema, ICart } from '../models/cart';

export class UserController {

    constructor() {
        this.login;
        this.register;
    }

    public async login(req: Request, res: Response) {
        const schema = Joi.object({
            username: Joi
                .string()
                .required(),
            password: Joi
                .string()
                .required()
        });

        try {
            const validate = await schema.validate(req.body);
            if (validate.error != null) {
                return res.status(STATUS_CODE_ERROR).send(validate.error.details[0].message);
            }

            const userExists = await userSchema.findOne({ "username": req.body.username });

            if (userExists && await bcrypt.compare(req.body.password, userExists.password)) {
                const token = jwt.sign(
                    {
                        _id: userExists._id
                    },
                    JWT_SECRET,
                    {
                        expiresIn: '6h'
                    });
                res.header('auth-token', token);
                return res.status(STATUS_CODE_SUCCESS).send('Login Successful');
            } else {
                return res.status(STATUS_CODE_ERROR).send('Username or password is incorrect!');
            }

        } catch (error) {
            console.error(error.message);
            return res.status(STATUS_CODE_ERROR).send(error.message);
        }
    }

    public async register(req: Request, res: Response) {
        const schema = Joi.object({
            username: Joi
                .string()
                .required(),
            password: Joi
                .string()
                .required()
        });

        try {
            const validate = await schema.validate(req.body);
            if (validate.error != null) {
                return res.status(STATUS_CODE_ERROR).send(validate.error.details[0].message);
            }

            const hashedPasswords = await getHashedPassword(req.body.password);
            const registeredUser = await new userSchema({
                username: req.body.username,
                password: hashedPasswords
                // password: helperObj.getHashedPassword(req.body.password)
            }).save();

            await new cartSchema({
                itemList: [],
                forUser: registeredUser._id
            }).save();

            return res.status(STATUS_CODE_SUCCESS).send(registeredUser);
        } catch (error) {
            console.error(error.message);
            return res.status(STATUS_CODE_ERROR).send(error.message);
        }
    }
}