import { Project } from './models/project';
import { SiteSettings } from './models/site-settings';
import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/routes";
import { RoutesAllowAnonymous } from './routes/routesAllowAnonymous';
import * as mongoose from "mongoose";
import * as cors from 'cors';
import * as fs from 'fs';
import * as path from 'path';

class App {

    public app: express.Application;
    public routes: Routes;

    private ca = [fs.readFileSync(path.join(__dirname, '../secrets/rootCA.pem') , 'utf8')];
    private cert = fs.readFileSync(path.join(__dirname, '../secrets/mongodb.pem'), 'utf8');
    private secrets = JSON.parse(fs.readFileSync(path.join(__dirname, '../secrets/secrets.json'), 'utf8'));

    private mongoUrl: string =  
        "mongodb://" + 
        this.secrets.mongodb.user + ":" + 
        encodeURIComponent(this.secrets.mongodb.pwd) + "@" + 
        this.secrets.mongodb.url + ":" + 
        this.secrets.mongodb.port + "/" + 
        this.secrets.mongodb.db + "?ssl=true";
    
    constructor() {
        this.app = express();
        this.config();
        this.mongoSetup();

        SiteSettings.findOne({ key: 'auth-settings' }).lean().exec((err, settings) => {
            if(settings.allowAnonymousAccess) {
                this.routes = new RoutesAllowAnonymous();
                console.log('allowAnonymousAccess: true');
            } 
            else {
                this.routes = new Routes();
                console.log('allowAnonymousAccess: false');
            }
            this.routes.setup(this.app);
        });
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.set("jwtSecret", this.secrets.jwt);
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        let options = {
            ssl: true,
            sslValidate: true,
            sslCA: this.ca,
            sslCert: this.cert,
            sslKey: this.cert,
            useNewUrlParser: true
        }
        mongoose.connect(this.mongoUrl, options);
    }

}

export default new App().app;

