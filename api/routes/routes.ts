import express from "express";
import { validate, validatonChecks } from "../validator/registerForm";
import search from "../controllers/search";
import register from "../controllers/register";
const router = express.Router();
router.get("/search", search);
router.post("/register", validatonChecks(), validate, register);
export default router;
