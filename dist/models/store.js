"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const StoreSchema = new mongoose_1.default.Schema({
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
exports.storeSchema = mongoose_1.default.model('Store', StoreSchema);
// export default mongoose.model('Store', StoreSchema);
