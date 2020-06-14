import mongoose from 'mongoose';

export interface IStore extends mongoose.Document {
    name: string,
    description: string,
    price: number,
    make: number
}

const StoreSchema: mongoose.Schema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    make: {
        type: Number,
        required: true
    }
});

export const storeSchema: mongoose.Model<IStore> = mongoose.model<IStore>('Store', StoreSchema);
// export default mongoose.model('Store', StoreSchema);