import { body, check, validationResult } from "express-validator";
let validatonChecks = () => {
  return [check("email").isEmail().withMessage("Please enter a valid email")];
};

let validate = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  const extractedErrors: any[] = [];
  errors
    .array({ onlyFirstError: true })
    .map((err) => extractedErrors.push({ message: err.msg }));
  req.formError = extractedErrors;
  console.log(req.formError);

  return next();
};

export { validatonChecks, validate };
