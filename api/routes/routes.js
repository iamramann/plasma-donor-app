"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const registerForm_1 = require("../validator/registerForm");
const search_1 = __importDefault(require("../controllers/search"));
const register_1 = __importDefault(require("../controllers/register"));
const router = express_1.default.Router();
router.get("/search", search_1.default);
router.post("/register", registerForm_1.validatonChecks(), registerForm_1.validate, register_1.default);
exports.default = router;
