import { Router, Application, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, STATUS_CODE_UNAUTHORISED, STATUS_CODE_ERROR, STATUS_CODE_SUCCESS } from '../helpers/constants';

export class AuthController {

    constructor() {
        this.getJwtPayload;
        this.verifyJwt;
    }

    public getJwtPayload(token: any): string {
        try {
            const token: string = "";
            const payloadData: any = jwt.decode(token);
            return payloadData ? payloadData.id : null;
        } catch (error) {
            console.error(error.message);
            throw new Error('Error while getting userID');
        }
    }

    public verifyJwt(req: Request, res: Response, next: NextFunction) {
        try {
            const token: any = req.header('auth-token');
            if (!token) {
                return res.status(STATUS_CODE_UNAUTHORISED).send('Please login to add product to cart!');
            }
            jwt.verify(token, JWT_SECRET);
            return next();
        } catch (error) {
            return res.status(STATUS_CODE_ERROR).send('Invalue User!');
        }
    }
}