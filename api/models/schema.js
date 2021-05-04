"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const newUserSchema = new mongoose_1.default.Schema({
    name: {
        type: {
            firstName: { type: String, lowercase: true, trim: true },
            lastName: { type: String, lowercase: true, trim: true },
        },
        required: true,
        trim: true,
    },
    Address: {
        type: {
            state: { type: String, lowercase: true, trim: true, required: true },
            district: { type: String, lowercase: true, trim: true, required: true },
            resident: { type: String, lowercase: true, trim: true, required: true },
        },
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: (value) => {
            return validator_1.default.isEmail(value);
        },
    },
    mobile: {
        type: String,
        required: true,
        validate: (value) => {
            return validator_1.default.isLength(value, { max: 10, min: 10 });
        },
    },
    dateOfCovid: {
        type: Date,
        required: true,
    },
    dateOfCure: {
        type: Date,
        required: true,
    },
});
mongoose_1.default.model("donors", newUserSchema);
module.exports = mongoose_1.default.model("donors");
