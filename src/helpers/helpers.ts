import bcrypt from 'bcrypt';
import { SALT } from '../helpers/constants';

export const getHashedPassword = async (password: string): Promise<string> => {
    const hashedPassword = await bcrypt.hash(password, SALT);
    return hashedPassword;
}