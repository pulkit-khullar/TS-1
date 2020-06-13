import { Router, Application, Request, Response, NextFunction } from 'express';
import Joi from '@hapi/joi';
import { Helpers } from '../helpers/helpers';
import jwt from 'jsonwebtoken';

export class UserController {

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
                return res.status(Helpers.STATUS_CODE_ERROR).send(validate.error.details[0].message);
            }

            if (req.body.username === req.body.password) {
                const token = jwt.sign(
                    {
                        _id: req.body.username
                    },
                    Helpers.JWT_SECRET,
                    {
                        expiresIn: '1h'
                    });
                res.header('auth-token', token);
                res.status(Helpers.STATUS_CODE_SUCCESS).send('Login Successful');
            } else {
                return res.status(Helpers.STATUS_CODE_ERROR).send('Username or password is incorrect!');
            }

        } catch (error) {
            console.error(error.message);
            return res.status(Helpers.STATUS_CODE_ERROR).send(error.message);
        }
    }
}