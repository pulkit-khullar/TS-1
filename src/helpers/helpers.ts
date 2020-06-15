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
        return payloadData._id;
    } catch (error) {
        console.error(error.message);
        throw new Error('Error while getting userID');
    }
}
