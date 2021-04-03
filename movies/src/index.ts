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
import * as ip from "ip";
import * as configClient from "cloud-config-client";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

(async () => {
    // Configuration Server
    let eurekaHost;
    let eurekaPort;
    let dbHost;
    let dbPort;
    await configClient.load({
        endpoint: process.env["CONFIG_URL"] ? process.env["CONFIG_URL"] : "http://localhost:8000",
        name: "movies",
        profiles: process.env["APP_PROFILE"] ? process.env["APP_PROFILE"] : "default"
    }).then((config: configClient.Config) => {
        eurekaHost = config.get("spring.eureka.host");
        eurekaPort = config.get("spring.eureka.port");
        dbHost = config.get("typeorm.database.host");
        dbPort = +config.get("typeorm.database.port");
    }).catch((error) => {
        console.error(error)
    })

    // TypeORM Configuration`
    const configORM : PostgresConnectionOptions = {
        name: "movies",
        type: "postgres",
        host: dbHost,
        port: dbPort,
        username: "admin",
        password: "admin",
        database: "movies",
        synchronize: true,
        logging: false,
        entities: [
           "src/entity/**/*.ts"
        ],
        migrations: [
           "src/migration/**/*.ts"
        ],
        subscribers: [
           "src/subscriber/**/*.ts"
        ],
        cli: {
           entitiesDir: "src/entity",
           migrationsDir: "src/migration",
           subscribersDir: "src/subscriber"
        }
     };

    const connection = await createConnection(configORM)
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
               app: 'MOVIES',
               instanceId: 'movies:3000',
               hostName: ip.address(),
               ipAddr: ip.address(),
                port: {
                    '$': 3000,
                    '@enabled': 'true',
                },
                vipAddress: "movies",
                dataCenterInfo: {
                    '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
                    name: 'MyOwn',
                }
            },
            logger: createLogger({name: 'eureka'}),
            eureka: {
                host: eurekaHost,
                port: eurekaPort,
                servicePath: '/eureka/apps/'
            }
        });
        eureka.logger.level('debug');
        eureka.start()
    });
    console.log("Express server has started on port 3000. Open http://localhost:3000 to see results");
})();

