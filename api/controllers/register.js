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
    if (req.formError.length > 0) {
        return res.status(422).json(req.formError[0]);
    }
    try {
        let userDetails = getUserDetailsObject(req);
        let user = await schema_1.default.create(userDetails);
        res.status(201).json({ message: "user registered successfully" });
    }
    catch (err) {
        if (err.code === 11000) {
            res.status(500).json({ message: "Mobile Number is already in use" });
            return;
        }
        res.status(500).json({ message: "something went wrong" });
    }
}
exports.default = default_1;
function getUserDetailsObject(req) {
    const month = [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JULY",
        "AUGUST",
        "SEPT",
        "OCT",
        "NOV",
        "DEC",
    ];
    let { firstName, lastName, mobileNumber, state, district, dateOfCovid, dateOfCure, age, gender, bloodGroup, } = req.body;
    let newDateOfCovid = Date.parse(dateOfCovid);
    let newDateOfCure = Date.parse(dateOfCure);
    let x = new Date(newDateOfCovid);
    let y = new Date(newDateOfCure);
    let userDetails = {
        name: {
            firstName: firstName.toLowerCase(),
            lastName: lastName.toLowerCase(),
        },
        mobileNumber,
        address: {
            state: state.toLowerCase(),
            district: district.toLowerCase(),
        },
        dateOfCovid: x.getDate() + "-" + month[x.getMonth()] + "-" + x.getFullYear(),
        dateOfCure: y.getDate() + "-" + month[y.getMonth()] + "-" + y.getFullYear(),
        age,
        gender,
        bloodGroup,
    };
    return userDetails;
}
