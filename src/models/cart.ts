import mongoose from 'mongoose';

const ItemSchema: mongoose.Schema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    }
});

const CartSchema: mongoose.Schema = new mongoose.Schema({
    itemList: [ItemSchema],
    forUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Cart', CartSchema);