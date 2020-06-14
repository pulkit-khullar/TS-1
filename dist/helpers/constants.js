"use strict";
// import dotenv from 'dotenv';
// import { string } from '@hapi/joi';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SALT = exports.MONGO_CONNECTION_STRING = exports.JWT_SECRET = exports.STATUS_CODE_UNAUTHORISED = exports.STATUS_CODE_SUCCESS = exports.STATUS_CODE_ERROR = void 0;
// export default class Constants {
//     STATUS_CODE_ERROR: number;
//     STATUS_CODE_SUCCESS: number;
//     STATUS_CODE_UNAUTHORISED: number;
//     JWT_SECRET: string;
//     MONGO_CONNECTION_STRING: string;
//     constructor() {
//         dotenv.config({ path: '.env' });
//         this.STATUS_CODE_ERROR = 500;
//         this.STATUS_CODE_SUCCESS = 200;
//         this.STATUS_CODE_UNAUTHORISED = 401;
//         this.JWT_SECRET = "as65d4qw65qwd6523!@#$";
//         this.MONGO_CONNECTION_STRING = "mongodb+srv://programmersstudio:crownstack@cluster0-hpbre.mongodb.net/crownstack?retryWrites=true&w=majority";
//         this.getStatusCodeError;
//         this.getStatusCodeSuccess;
//         this.getStatusCodeUnauthorised;
//         this.getJwtSecret;
//         this.getDbConnectionString;
//     }
//     public getStatusCodeError(): number {
//         return this.STATUS_CODE_ERROR;
//     }
//     public getStatusCodeUnauthorised(): number {
//         return this.STATUS_CODE_UNAUTHORISED;
//     }
//     public getStatusCodeSuccess(): number {
//         return this.STATUS_CODE_SUCCESS;
//     }
//     public getJwtSecret(): string {
//         return this.JWT_SECRET;
//     }
//     public getDbConnectionString(): string {
//         return this.MONGO_CONNECTION_STRING;
//     }
// }
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '.env' });
exports.STATUS_CODE_ERROR = 500;
exports.STATUS_CODE_SUCCESS = 200;
exports.STATUS_CODE_UNAUTHORISED = 401;
exports.JWT_SECRET = "as65d4qw65qwd6523!@#$";
exports.MONGO_CONNECTION_STRING = "mongodb+srv://programmersstudio:crownstack@cluster0-hpbre.mongodb.net/crownstack?retryWrites=true&w=majority";
exports.SALT = 10;
