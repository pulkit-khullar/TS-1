"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helpers = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const joi_1 = require("@hapi/joi");
class Helpers {
    constructor() {
        dotenv_1.default.config({ path: '.env' });
        this.getHashedPassword(password, joi_1.string);
    }
    // public static JWT_SECRET: any = process.env.JWT_SECRET;
    // public static MONGO_CONNECTION_STRING: any = process.env.MONGO_CONNECTION_STRING;
    // public static readonly JWT_SECRET = process.env["JWT_SECRET"];
    // public static readonly MONGO_CONNECTION_STRING = process.env["MONGO_CONNECTION_STRING"];
    getHashedPassword(password) {
        return "";
    }
}
exports.Helpers = Helpers;
Helpers.STATUS_CODE_ERROR = 500;
Helpers.STATUS_CODE_SUCCESS = 200;
Helpers.STATUS_CODE_UNAUTHORISED = 401;
Helpers.JWT_SECRET = "as65d4qw65qwd6523!@#$";
Helpers.MONGO_CONNECTION_STRING = "mongodb+srv://programmersstudio:crownstack@cluster0-hpbre.mongodb.net/crownstack?retryWrites=true&w=majority";
