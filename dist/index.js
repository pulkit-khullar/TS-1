"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const baseRoutes_1 = require("./routes/baseRoutes");
class Server {
    constructor() {
        dotenv_1.default.config();
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.text());
        this.app.use(body_parser_1.default.urlencoded({
            extended: true
        }));
        this.app.set("port", process.env.PORT || 3000);
    }
    routes() {
        this.app.use("/api", new baseRoutes_1.BaseRoutes().router);
    }
    start() {
        this.app.listen(this.app.get("port"), () => {
            console.log("Server started running at port : ", this.app.get("port"));
            console.log(`http://127.0.0.1:${this.app.get("port")}/`);
        });
    }
}
const server = new Server();
server.start();
