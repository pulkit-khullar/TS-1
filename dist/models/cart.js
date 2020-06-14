"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ItemSchema = new mongoose_1.default.Schema({
    item: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    }
});
const CartSchema = new mongoose_1.default.Schema({
    itemList: [ItemSchema],
    forUser: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});
module.exports = mongoose_1.default.model('Cart', CartSchema);
