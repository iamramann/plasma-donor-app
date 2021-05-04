import express from "express";
import db from "./config/connect";
const app = express();
import bodyParser from "body-parser";
import router from "./routes/routes.js";
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", router);
db();
app.listen(8000, () => {
  console.log(">>> at 8000");
});
