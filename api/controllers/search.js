"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * return an array of user who does belong to queried state and district
 */
const schema_1 = __importDefault(require("../models/schema"));
async function default_1(req, res) {
    // console.log(req.query);
    let { state, district, bloodGroup } = req.query;
    let x = state.toLowerCase();
    let y = district.toLowerCase();
    try {
        let result = await schema_1.default.find({
            "address.state": x,
            "address.district": y,
            bloodGroup: bloodGroup,
            isActive: true,
        });
        if (result.length > 0) {
            res.status(200).json(result);
        }
        else {
            res.status(404).json({ message: "No records found" });
        }
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
}
exports.default = default_1;
