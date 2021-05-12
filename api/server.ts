import express from "express";
import db from "./config/connect";
import { PORT } from "./config/dev";
import cors from "cors";
const app = express();
import router from "./routes/routes.js";
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use("/", router);
db();
app.listen(PORT, () => {
  console.log(`>>> server is running at ${PORT}`);
});
