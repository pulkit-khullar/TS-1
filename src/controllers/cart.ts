import { Router, Application, Request, Response, NextFunction } from 'express';
import Joi from '@hapi/joi';
import { getJwtPayload } from '../helpers/helpers';
import { JWT_SECRET, STATUS_CODE_ERROR, STATUS_CODE_SUCCESS, STATUS_CODE_UNAUTHORISED } from '../helpers/constants';
import { AuthController } from './auth';
import { cartSchema, ICart } from '../models/cart';

export class CartController {

    public async getCart(req: Request, res: Response) {
        try {
            const userId = await getJwtPayload(req.header('auth-token'));
            // const cart = await cartSchema.find({ forUser: userId });
            const cart = await cartSchema.find({ forUser: userId }).populate('forUser', 'itemList.itemId');
            return res.status(STATUS_CODE_SUCCESS).send(cart);
        } catch (error) {
            console.error(error);
            return res.status(STATUS_CODE_ERROR).send(error.message);
        }
    }

    public async cartOpearations(req: Request, res: Response) {
        const schema = Joi.object({
            operation: Joi
                .string()
                .uppercase()
                .required(),
            productId: Joi
                .string()
                .required()
        });
        try {
            const validate = await schema.validate(req.body);
            if (validate.error != null) {
                return res.status(STATUS_CODE_ERROR).send(validate.error.details[0].message);
            }
            const userId = await getJwtPayload(req.header('auth-token'));

            if (req.body.operation === 'ADD') {
                const item = { "itemId": req.body.productId };
                const updatedCart = await cartSchema.findOneAndUpdate({ forUser: userId }, { $push: { itemList: { itemId: req.body.productId } } }, {new: true}).populate('forUser', 'itemList.itemId');
                return res.status(STATUS_CODE_SUCCESS).send(updatedCart);
            } else if (req.body.operation === 'SUB') {
                const item = { "itemId": req.body.productId };
                const updatedCart = await cartSchema.findOneAndUpdate({ forUser: userId }, { $pull: { itemList: item } }, {new: true}).populate('forUser', 'itemList.itemId');
                return res.status(STATUS_CODE_SUCCESS).send(updatedCart);
            } else {
                return res.status(STATUS_CODE_ERROR).send('Invalid operation!');
            }

        } catch (error) {
            console.error(error);
            return res.status(STATUS_CODE_ERROR).send(error.message);
        }
    }
}