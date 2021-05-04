"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dev_1 = require("./dev");
const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
};
function default_1() {
    mongoose_1.default
        .connect(dev_1.MONGOURL, connectionParams)
        .then(() => {
        console.log(">>> Connected to database ");
    })
        .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    });
    mongoose_1.default.connection.on("connected", () => {
        console.log(">>> Mongoose default connection is open");
    });
    mongoose_1.default.connection.on("disconnected", () => {
        console.log("Mongoose default connection is disconnected ");
    });
    process.on("SIGINT", function () {
        mongoose_1.default.connection.close(function () {
            console.log("Mongoose default connection is disconnected due to application termination");
            process.exit(0);
        });
    });
}
exports.default = default_1;
