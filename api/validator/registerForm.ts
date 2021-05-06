import { body, check, validationResult } from "express-validator";
let validatonChecks = () => {
  return [
    check("firstName")
      .not()
      .isEmpty()
      .withMessage("First Name cannot be empty")
      .isAlphanumeric()
      .withMessage("last name cannot contain alphanumeric characters"),

    check("lastName")
      .not()
      .isEmpty()
      .withMessage("Last Name cannot be empty")
      .not()
      .isNumeric()
      .withMessage("last name cannot contain alphanumeric characters"),

    check("state").not().isEmpty().withMessage("state can't be left blank"),
    check("district")
      .not()
      .isEmpty()
      .withMessage("District can't be left blank"),
    check("mobile")
      .not()
      .isEmpty()
      .withMessage("Mobile number cannot be empty")
      .matches(/^[789]\d{9}$/)
      .withMessage("Not a valid mobile Number"),
    check("dateOfCovid")
      .not()
      .isEmpty()
      .withMessage("Please enter a valid date")
      .withMessage("Invalid datey"),
    check("dateOfCure")
      .not()
      .isEmpty()
      .withMessage("Please enter a valid date")
      .withMessage("Invalid datex"),
  ];
};

let validate = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  const extractedErrors: any[] = [];
  errors
    .array({ onlyFirstError: true })
    .map((err) => extractedErrors.push({ message: err.msg }));
  req.formError = extractedErrors;
  return next();
};

export { validatonChecks, validate };
