import { Router, Application, Request, Response, NextFunction } from 'express';
import Joi from '@hapi/joi';
import { Helpers } from '../helpers/helpers';
import { AuthController } from './auth';

export class CartController {

    public async getCart(req: Request, res: Response) {
        try {

        } catch (error) {
            console.error(error);
            return res.status(Helpers.STATUS_CODE_ERROR).send(error.message);
        }
    }

    public async cartOpearations(req: Request, res: Response) {
        try {
            
        } catch (error) {
            console.error(error);
            return res.status(Helpers.STATUS_CODE_ERROR).send(error.message);
        }
    }
}