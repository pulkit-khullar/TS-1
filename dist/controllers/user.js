"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const helpers_1 = require("../helpers/helpers");
const constants_1 = require("../helpers/constants");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const cart_1 = require("../models/cart");
class UserController {
    constructor() {
        this.login;
        this.register;
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object({
                username: joi_1.default
                    .string()
                    .required(),
                password: joi_1.default
                    .string()
                    .required()
            });
            try {
                const validate = yield schema.validate(req.body);
                if (validate.error != null) {
                    return res.status(constants_1.STATUS_CODE_ERROR).send(validate.error.details[0].message);
                }
                const userExists = yield user_1.userSchema.findOne({ "username": req.body.username });
                if (userExists && (yield bcrypt_1.default.compare(req.body.password, userExists.password))) {
                    const token = jsonwebtoken_1.default.sign({
                        _id: userExists._id
                    }, constants_1.JWT_SECRET, {
                        expiresIn: '6h'
                    });
                    res.header('auth-token', token);
                    return res.status(constants_1.STATUS_CODE_SUCCESS).send('Login Successful');
                }
                else {
                    return res.status(constants_1.STATUS_CODE_ERROR).send('Username or password is incorrect!');
                }
            }
            catch (error) {
                console.error(error.message);
                return res.status(constants_1.STATUS_CODE_ERROR).send(error.message);
            }
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object({
                username: joi_1.default
                    .string()
                    .required(),
                password: joi_1.default
                    .string()
                    .required()
            });
            try {
                const validate = yield schema.validate(req.body);
                if (validate.error != null) {
                    return res.status(constants_1.STATUS_CODE_ERROR).send(validate.error.details[0].message);
                }
                const hashedPasswords = yield helpers_1.getHashedPassword(req.body.password);
                const registeredUser = yield new user_1.userSchema({
                    username: req.body.username,
                    password: hashedPasswords
                    // password: helperObj.getHashedPassword(req.body.password)
                }).save();
                yield new cart_1.cartSchema({
                    itemList: [],
                    forUser: registeredUser._id
                }).save();
                return res.status(constants_1.STATUS_CODE_SUCCESS).send(registeredUser);
            }
            catch (error) {
                console.error(error.message);
                return res.status(constants_1.STATUS_CODE_ERROR).send(error.message);
            }
        });
    }
}
exports.UserController = UserController;
