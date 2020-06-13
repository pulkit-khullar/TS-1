import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import { BaseRoutes } from './routes/baseRoutes';

class Server {
    public app: Application;

    constructor() {
        dotenv.config();
        this.app = express();
        this.config();
        this.routes();
    }

    public config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.text());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.set("port", process.env.PORT || 3000);
    }

    public routes(): void {
        this.app.use("/api", new BaseRoutes().router);
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