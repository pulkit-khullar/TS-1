"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("./helpers/constants");
const baseRoutes_1 = require("./routes/baseRoutes");
class Server {
    constructor() {
        dotenv_1.default.config({ path: '.env' });
        this.app = express_1.default();
        this.config();
        this.routes();
        this.mongo();
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
    mongo() {
        const dbUrl = constants_1.MONGO_CONNECTION_STRING;
        const connection = mongoose_1.default.connection;
        connection.on("connected", () => {
            console.log("Mongo Connection Established");
        });
        connection.on("reconnected", () => {
            console.log("Mongo Connection Reestablished");
        });
        connection.on("disconnected", () => {
            console.log("Mongo Connection Disconnected");
            console.log("Trying to reconnect to Mongo ...");
            setTimeout(() => {
                mongoose_1.default.connect(dbUrl, {
                    autoReconnect: true,
                    keepAlive: true,
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    autoIndex: true
                });
            }, 3000);
        });
        connection.on("close", () => {
            console.log("Mongo Connection Closed");
        });
        connection.on("error", (error) => {
            console.log("Mongo Connection ERROR: " + error);
        });
        const run = () => __awaiter(this, void 0, void 0, function* () {
            yield mongoose_1.default.connect(dbUrl, {
                autoReconnect: true,
                keepAlive: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                autoIndex: true
            });
        });
        run().catch(error => console.error(error));
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
