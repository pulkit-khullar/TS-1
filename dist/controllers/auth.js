"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helpers_1 = require("../helpers/helpers");
class AuthController {
    constructor() {
        this.getJwtPayload;
        this.verifyJwt;
    }
    getJwtPayload(token) {
        try {
            const token = "";
            const payloadData = jsonwebtoken_1.default.decode(token);
            return payloadData ? payloadData.id : null;
        }
        catch (error) {
            console.error(error.message);
            throw new Error('Error while getting userID');
        }
    }
    verifyJwt(req, res, next) {
        try {
            const token = req.header('auth-token');
            if (!token) {
                return res.status(helpers_1.Helpers.STATUS_CODE_UNAUTHORISED).send('Please login to add product to cart!');
            }
            jsonwebtoken_1.default.verify(token, helpers_1.Helpers.JWT_SECRET);
            return next();
        }
        catch (error) {
            return res.status(helpers_1.Helpers.STATUS_CODE_UNAUTHORISED).send('Invalue User!');
        }
    }
}
exports.AuthController = AuthController;
