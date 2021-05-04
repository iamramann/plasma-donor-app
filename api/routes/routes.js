"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import schema from "../models/schema";
const router = express_1.default.Router();
// app.use(express.json());
router.post("/register", 
// validatonChecks(),
// validate,
(req, res) => {
    console.log(req.body);
    res.json(req.body);
    // let query = schema.create()
});
exports.default = router;
