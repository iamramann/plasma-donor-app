import express, { response } from "express";
import { validate, validatonChecks } from "../validator/registerForm";
// import schema from "../models/schema";
const router = express.Router();
// app.use(express.json());
router.post(
  "/register",
  // validatonChecks(),
  // validate,
  (req: any, res: any) => {
    console.log(req.body);
    res.json(req.body);
    // let query = schema.create()
  }
);

export default router;
