import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Eureka} from 'eureka-js-client';
import {createLogger} from "bunyan";
import {NextFunction, Request, Response} from "express";
import router from "./router";
import  {ErrorHandler} from "./middleware/ErrorHandler"
import {Movie} from "./entity/Movie";



(async () => {
    const connection = await createConnection()
    const app = express();
    app.locals.database = connection;
    app.use(bodyParser.json());
    app.use((req:Request, res: Response, next:NextFunction)=>{
        const logger = createLogger({name: 'movies'});
         res.locals.logger = logger;
        next()
    });
    app.use((req:Request, res: Response, next:NextFunction)=>{
        const log = res.locals.logger;
        log.info("Iniciou request")
        next()
    });
    app.get('/healthcheck',  (req, res, next:NextFunction)=> {
        const log = app.locals.logger;
        log.info("Iniciou request")
        res.send('API Movies Alive');
        next()
    });
    app.get('/',  (req, res, next:NextFunction)=> {
        const log = app.locals.logger;

        res.send('API Movies Alive');
        next()
    });
    app.use(router)
    app.use(ErrorHandler);
    app.use((req:Request, res: Response, next:NextFunction)=>{
        res.locals.logger.info({ res: { status: res.statusCode, message: res.statusMessage } }, 'RESPONSE:::status');
        return next();
    });
    app.listen(3000, () => {

        const eureka = new Eureka({
            instance: {
               app: 'movies',
               instanceId: 'movies-3000',
               hostName: 'localhost',
               ipAddr: '0.0.0.0',
               statusPageUrl: 'http://localhost:3000',
                port: {
                    '$': 3000,
                    '@enabled': 'true',
                },
                vipAddress: 'localhost',
                dataCenterInfo: {
                    '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
                    name: 'MyOwn',
                }
            },
            logger: createLogger({name: 'eureka'}),
            eureka: {
                host: 'localhost',
                port: 7000,
                servicePath: '/eureka/apps/'
            }
        });
        eureka.logger.level('debug');
        eureka.start()
    });
    console.log("Express server has started on port 3000. Open http://localhost:3000 to see results");
})();

