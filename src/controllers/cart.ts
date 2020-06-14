import { Router, Application, Request, Response, NextFunction } from 'express';
import Joi from '@hapi/joi';
// import Helpers from '../helpers/helpers';
import { JWT_SECRET, STATUS_CODE_ERROR, STATUS_CODE_SUCCESS } from '../helpers/constants';
import { AuthController } from './auth';

export class CartController {

    public async getCart(req: Request, res: Response) {
        try {

        } catch (error) {
            console.error(error);
            return res.status(STATUS_CODE_ERROR).send(error.message);
        }
    }

    public async cartOpearations(req: Request, res: Response) {
        try {

        } catch (error) {
            console.error(error);
            return res.status(STATUS_CODE_ERROR).send(error.message);
        }
    }
}