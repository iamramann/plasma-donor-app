"use strict";
/**
 * handle user registration
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("../models/schema"));
async function default_1(req, res) {
    console.log(req.body);
    // console.log(req.formError);
    // if (req.formError.length > 0) {
    //   return res.status(422).json({ error: req.formError });
    // }
    try {
        let userDetails = getUserDetailsObject(req);
        let user = await schema_1.default.create(userDetails);
        res.status(201).json({ message: "user registered successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err._message });
    }
}
exports.default = default_1;
function getUserDetailsObject(req) {
    let { firstName, lastName, mobile, state, district, dateOfCovid, dateOfCure, age, gender, } = req.body;
    let userDetails = {
        name: {
            firstName: firstName.toLowerCase(),
            lastName: lastName.toLowerCase(),
        },
        mobile,
        address: {
            state: state.toLowerCase(),
            district: district.toLowerCase(),
            // resident: resident.toLowerCase(),
        },
        dateOfCovid,
        dateOfCure,
        age,
        gender,
    };
    return userDetails;
}
