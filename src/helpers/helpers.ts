import bcrypt from 'bcrypt';
import { SALT } from '../helpers/constants';
import jwt from 'jsonwebtoken';

export const getHashedPassword = async (password: string): Promise<string> => {
    const hashedPassword = await bcrypt.hash(password, SALT);
    return hashedPassword;
}

export const getJwtPayload = async (token: any): Promise<string> => {
    try {
        const payloadData: any = jwt.decode(token);
        return payloadData ? payloadData._id : null;
    } catch (error) {
        console.error(error.message);
        throw new Error('Error while getting userID');
    }
}
