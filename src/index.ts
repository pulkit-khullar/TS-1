import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose, { Error } from 'mongoose';

import { MONGO_CONNECTION_STRING , PORT} from './helpers/constants';
import { BaseRoutes } from './routes/baseRoutes';

export default class Server {
    public app: Application;

    constructor() {
        dotenv.config({ path: '.env' });
        this.app = express();
        this.config();
        this.routes();
        this.mongo();
    }

    public config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.text());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.set("port", PORT || 5000);
    }

    public routes(): void {
        this.app.use("/api", new BaseRoutes().router);
    }

    private mongo() {
        const dbUrl: string = MONGO_CONNECTION_STRING;
        const connection = mongoose.connection;
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
                mongoose.connect(dbUrl, {
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
        connection.on("error", (error: Error) => {
            console.log("Mongo Connection ERROR: " + error);
        });

        const run = async () => {
            await mongoose.connect(dbUrl, {
                autoReconnect: true,
                keepAlive: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                autoIndex: true
            });
        };
        run().catch(error => console.error(error));
    }

    public start(): void {
        this.app.listen(this.app.get("port"), () => {
            console.log("Server started running at port : ", this.app.get("port"));
            console.log(`http://127.0.0.1:${this.app.get("port")}/`);
        });
    }
}

const server = new Server();
server.start();