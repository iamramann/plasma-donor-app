import express from "express";
import { validate, validatonChecks } from "../validator/registerForm";
import search from "../controllers/search";
import register from "../controllers/register";
import schema from "../models/schema";
const router = express.Router();
// let x = Date.parse("2021-05-11");
// console.log(new Date(x));

// console.log(Date.parse("2021-05-11"));

router.get("/search", search);
router.post("/register", validatonChecks(), validate, register);
router.get("/hide", (req, res) => {
  console.log(req.query._id);
  let id = req.query._id;
  // schema.findById(id, (err: any, data: any) => {
  //   if (err) throw err;
  //   else console.log(data);
  // });

  schema.findByIdAndUpdate(id, { isActive: false }, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Failed to update" });
    } else {
      console.log(data);

      res.status(200).json(data);
    }
  });
});
// router.post("/register", register);
export default router;
