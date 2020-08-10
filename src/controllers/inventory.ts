import { Request, Response } from 'express';
import Joi from '@hapi/joi';
import { STATUS_CODE_ERROR, STATUS_CODE_SUCCESS } from '../helpers/constants';

import { storeSchema } from '../models/store';

export class InventoryController {

    constructor() {
        this.getInventory;
        this.addInventory;
    }

    public async getInventory(req: Request, res: Response) {
        try {
            const list = await storeSchema.find();

            return res.status(STATUS_CODE_SUCCESS).send(list);

        } catch (error) {
            console.error(error);
            return res.status(STATUS_CODE_ERROR).send(error.message);
        }
    }

    public async addInventory(req: Request, res: Response) {
        const schema = Joi.object({
            name: Joi
                .string()
                .required(),
            description: Joi
                .string()
                .required(),
            price: Joi
                .number()
                .min(1)
                .strict()
                .required(),
            make: Joi
                .number()
                .integer()
                .min(1900)
                .max(2020)
                .strict()
                .required(),
        });
        try {
            const validate = await schema.validate(req.body);
            if (validate.error != null) {
                return res.status(STATUS_CODE_ERROR).send(validate.error.details[0].message);
            }

            const item = await new storeSchema({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                make: req.body.make
            }).save();

            return res.status(STATUS_CODE_SUCCESS).send(item);

        } catch (error) {
            console.error(error);
            return res.status(STATUS_CODE_ERROR).send(error.message);
        }
    }
}