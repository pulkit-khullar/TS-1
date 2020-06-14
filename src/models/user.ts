import mongoose from 'mongoose';

export interface IUser extends mongoose.Document{
    usermane: string,
    password: string
}

const UserSchema: mongoose.Schema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

export const userSchema: mongoose.Model<IUser> = mongoose.model<IUser>('User', UserSchema);
// export UserSchema: moIUser =  mongoose.model<IUser>('User', UserSchema);