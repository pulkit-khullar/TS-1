import { Router, Application, Request, Response, NextFunction } from 'express';
import Joi from '@hapi/joi';
import { Helpers } from '../helpers/helpers';
import { AuthController } from './auth';

export class InventoryController {

    public async getInventory(req: Request, res: Response) {
        try {
            const authController: AuthController = new AuthController();

            // const userId: string = authController.getJwtPayload(req.header('auth-token'));

            /**
             *  PERFORM DB OPERATIONS AND RETURN THE PRODUCT LISTS
             */

        } catch (error) {
            console.error(error);
            return res.status(Helpers.STATUS_CODE_ERROR).send(error.message);
        }
    }
}