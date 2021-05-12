"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newUserSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
exports.newUserSchema = new mongoose_1.Schema({
    name: {
        type: {
            firstName: { type: String, lowercase: true, trim: true },
            lastName: { type: String, lowercase: true, trim: true },
        },
        required: true,
        trim: true,
    },
    address: {
        type: {
            state: { type: String, lowercase: true, trim: true, required: true },
            district: { type: String, lowercase: true, trim: true, required: true },
        },
        lowercase: true,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true,
        validate: (value) => {
            return validator_1.default.isLength(value, { max: 10, min: 10 });
        },
    },
    age: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    dateOfCovid: {
        type: String,
        required: true,
    },
    dateOfCure: {
        type: String,
        required: true,
    },
    bloodGroup: { type: String, required: true },
    isActive: { type: Boolean, default: true },
});
const schema = mongoose_1.default.model("mydonorr", exports.newUserSchema);
exports.default = schema;
