import express from "express";
import db from "./config/connect";
import cors from "cors";
const app = express();
import router from "./routes/routes.js";
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use("/", router);
db();
app.listen(5000, () => {
  console.log(">>> at 5000");
});
