import mongoose from 'mongoose';

export interface ICart extends mongoose.Document {
    itemList: any[],
    forUser: string
}

const CartSchema: mongoose.Schema = new mongoose.Schema({
    itemList: [
        {
            itemId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Store',
                required: true
            }
        }
    ],
    forUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

export const cartSchema: mongoose.Model<ICart> = mongoose.model<ICart>('Cart', CartSchema);
// module.exports = mongoose.model('Cart', CartSchema);