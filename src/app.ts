import * as mongo from './mongo';
import * as express from 'express';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import indexApi from './api'

class App {
    app: express.Application = express()

    constructor() {
        this.config()
        mongo.connect()
        this.app.use(indexApi())
    }

    private config(): void {
        dotenv.config();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
            res.header('Access-Control-Allow-Credentials', 'true');
            next();
        });
    }
}

export default new App().app