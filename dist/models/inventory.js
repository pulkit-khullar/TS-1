"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// const mongoose = require('mongoose');
const InventorySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        unique: true,
        required: true
    },
    password: {
        type: String
        // required: true
    },
    noOfUsersAdded: {
        type: Number
    }
});
module.exports = mongoose_1.default.model('Inventory', InventorySchema);
