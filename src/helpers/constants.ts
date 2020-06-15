import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export const STATUS_CODE_ERROR = 500;
export const STATUS_CODE_SUCCESS = 200;
export const STATUS_CODE_UNAUTHORISED = 401;
export const SALT = 10;
export const JWT_SECRET: any = process.env.JWT_SECRET;
export const MONGO_CONNECTION_STRING: any = process.env.MONGO_CONNECTION_STRING;
export const PORT:any = process.env.PORT;