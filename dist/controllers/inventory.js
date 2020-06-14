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
exports.InventoryController = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const constants_1 = require("../helpers/constants");
const auth_1 = require("./auth");
const store_1 = require("../models/store");
class InventoryController {
    constructor() {
        this.getInventory;
        this.addInvnetory;
    }
    getInventory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authController = new auth_1.AuthController();
                const list = yield store_1.storeSchema.find();
                res.status(constants_1.STATUS_CODE_SUCCESS).send(list);
            }
            catch (error) {
                console.error(error);
                return res.status(constants_1.STATUS_CODE_ERROR).send(error.message);
            }
        });
    }
    addInvnetory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object({
                name: joi_1.default
                    .string()
                    .required(),
                description: joi_1.default
                    .string()
                    .required(),
                price: joi_1.default
                    .number()
                    .min(1)
                    .strict()
                    .required(),
                make: joi_1.default
                    .number()
                    .integer()
                    .min(1900)
                    .max(2020)
                    .strict()
                    .required(),
            });
            try {
                const validate = yield schema.validate(req.body);
                if (validate.error != null) {
                    return res.status(constants_1.STATUS_CODE_ERROR).send(validate.error.details[0].message);
                }
                const item = yield new store_1.storeSchema({
                    name: req.body.name,
                    description: req.body.description,
                    price: req.body.price,
                    make: req.body.make
                }).save();
                res.status(constants_1.STATUS_CODE_SUCCESS).send(item);
            }
            catch (error) {
                console.error(error);
                return res.status(constants_1.STATUS_CODE_ERROR).send(error.message);
            }
        });
    }
}
exports.InventoryController = InventoryController;
