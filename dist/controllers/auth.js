"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../helpers/constants");
class AuthController {
    constructor() {
        this.verifyJwt;
    }
    verifyJwt(req, res, next) {
        try {
            const token = req.header('auth-token');
            if (!token) {
                return res.status(constants_1.STATUS_CODE_UNAUTHORISED).send('Please login to add product to cart!');
            }
            jsonwebtoken_1.default.verify(token, constants_1.JWT_SECRET);
            return next();
        }
        catch (error) {
            return res.status(constants_1.STATUS_CODE_ERROR).send('Invalue User!');
        }
    }
}
exports.AuthController = AuthController;
