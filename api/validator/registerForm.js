"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.validatonChecks = void 0;
const express_validator_1 = require("express-validator");
let validatonChecks = () => {
    return [express_validator_1.check("email").isEmail().withMessage("Please enter a valid email")];
};
exports.validatonChecks = validatonChecks;
let validate = (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    const extractedErrors = [];
    errors
        .array({ onlyFirstError: true })
        .map((err) => extractedErrors.push({ message: err.msg }));
    req.formError = extractedErrors;
    console.log(req.formError);
    return next();
};
exports.validate = validate;
