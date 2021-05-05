"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.validatonChecks = void 0;
const express_validator_1 = require("express-validator");
let validatonChecks = () => {
    return [
        express_validator_1.check("firstName")
            .not()
            .isEmpty()
            .withMessage("First Name cannot be empty")
            .isAlphanumeric()
            .withMessage("last name cannot contain alphanumeric characters"),
        express_validator_1.check("lastName")
            .not()
            .isEmpty()
            .withMessage("Last Name cannot be empty")
            .not()
            .isNumeric()
            .withMessage("last name cannot contain alphanumeric characters"),
        express_validator_1.check("state").not().isEmpty().withMessage("state can't be left blank"),
        express_validator_1.check("district")
            .not()
            .isEmpty()
            .withMessage("District can't be left blank"),
        express_validator_1.check("mobile")
            .not()
            .isEmpty()
            .withMessage("Mobile number cannot be empty")
            .matches(/^[789]\d{9}$/)
            .withMessage("Not a valid mobile Number"),
        express_validator_1.check("dateOfCovid")
            .not()
            .isEmpty()
            .withMessage("Please enter a valid date")
            .not()
            .isDate()
            .withMessage("Invalid datey"),
        express_validator_1.check("dateOfCure")
            .not()
            .isEmpty()
            .withMessage("Please enter a valid date")
            .not()
            .isDate()
            .withMessage("Invalid datex"),
    ];
};
exports.validatonChecks = validatonChecks;
let validate = (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    const extractedErrors = [];
    errors
        .array({ onlyFirstError: true })
        .map((err) => extractedErrors.push({ message: err.msg }));
    req.formError = extractedErrors;
    return next();
};
exports.validate = validate;
