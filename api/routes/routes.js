"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const registerForm_1 = require("../validator/registerForm");
const search_1 = __importDefault(require("../controllers/search"));
const register_1 = __importDefault(require("../controllers/register"));
const schema_1 = __importDefault(require("../models/schema"));
const router = express_1.default.Router();
// let x = Date.parse("2021-05-11");
// console.log(new Date(x));
// console.log(Date.parse("2021-05-11"));
router.get("/search", search_1.default);
router.post("/register", registerForm_1.validatonChecks(), registerForm_1.validate, register_1.default);
router.get("/hide", (req, res) => {
    console.log(req.query._id);
    let id = req.query._id;
    // schema.findById(id, (err: any, data: any) => {
    //   if (err) throw err;
    //   else console.log(data);
    // });
    schema_1.default.findByIdAndUpdate(id, { isActive: false }, (err, data) => {
        if (err) {
            res.status(500).json({ message: "Failed to update" });
        }
        else {
            console.log(data);
            res.status(200).json(data);
        }
    });
});
// router.post("/register", register);
exports.default = router;
