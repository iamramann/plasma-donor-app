"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connect_1 = __importDefault(require("./config/connect"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
const routes_js_1 = __importDefault(require("./routes/routes.js"));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(cors_1.default());
app.use("/", routes_js_1.default);
connect_1.default();
app.listen(5000, () => {
    console.log(">>> at 5000");
});
