// import dotenv from 'dotenv';
// import { string } from '@hapi/joi';

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

import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export const STATUS_CODE_ERROR = 500;
export const STATUS_CODE_SUCCESS = 200;
export const STATUS_CODE_UNAUTHORISED = 401;
export const JWT_SECRET = "as65d4qw65qwd6523!@#$";
export const MONGO_CONNECTION_STRING = "mongodb+srv://programmersstudio:crownstack@cluster0-hpbre.mongodb.net/crownstack?retryWrites=true&w=majority";
export const SALT = 10;