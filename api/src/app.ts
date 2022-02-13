import express, { Router } from "express";
import logger from "morgan";
import * as bodyParser from "body-parser"
import "express-async-errors";
import carApplication from "./application/car";
import alertApplication from './application/alert';
import positionApplication from './application/position';
import loginApplication from './application/login';
import userApplication from './application/user';
import carStateApplication from './application/car-state'
import utils from "./util"
import jwtAuthenticator from "./middleware/jwt.authenticator";

import { errorHandler, errorNotFoundHandler } from "./middlewares/errorHandler";

import dataProviders from "./data-providers";
import { Server, Database } from "./config";
import { allowedNodeEnvironmentFlags } from "process";
import { EventEmitter } from "stream";
import { RastracEventEmitter } from "./data-providers/rastrac.provider";
import mySqlProvider from "./data-providers/my-sql.provider";
import passport from "passport";
import cors from "cors";
// Create Express server
export const app = express();


if(Server.isDev)
  app.use(logger("dev"));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

jwtAuthenticator.initialize();

async function RegisterControllers() {
  const authMiddleware = passport.authenticate('jwt', { session: false });

  const util = utils.Util.create();
  const rastracEventEmitter = new EventEmitter() as RastracEventEmitter;
  const mysqlInstance = await mySqlProvider.create();
  const dataProvider = await dataProviders.create(rastracEventEmitter, mysqlInstance);
  
  const addCarRoutes = async () => {
    const data = await carApplication.data.create(dataProvider);
    const handler = await carApplication.handler.create(data);
    const router = carApplication.controller.create(handler, util);

    app.use('/cars', router);
  }
  const addAlertRoutes = async () => {
    const data = await alertApplication.data.create(dataProvider);
    const handler = await alertApplication.handler.create(data, util);
    const router = await alertApplication.controller.create(handler, util, authMiddleware);

    app.use('/alerts', router);
  }

  const addPositionRoutes = async() => {
    const data = await positionApplication.data.create(dataProvider);
    const handler = await positionApplication.handler.create(data, rastracEventEmitter);
    const router = await positionApplication.controller.create(handler, util, authMiddleware);

    app.use('/positions', router);
  }

  const addLoginRoutes = async () => {
    const data = await loginApplication.data.create(dataProvider);
    const handler = await loginApplication.handler.create(data)
    const router = await loginApplication.controller.create(handler);

    app.use('/login', router);
  }

  const addUserRoutes = async () => {
    const data = await userApplication.data.create(dataProvider);
    const handler = await userApplication.handler.create(data);
    const router = await userApplication.controller.create(handler, authMiddleware);

    app.use('/users', router);

  }

  const addCarStateRoutes = async () => {
    const handler = await carStateApplication.handler.create(rastracEventEmitter);
    const controller = await carStateApplication.controller.create(handler);

    app.use('/car-states', controller);
  }

  await Promise.all([
    addCarRoutes(), 
    addAlertRoutes(),
    addPositionRoutes(),
    addLoginRoutes(),
    addUserRoutes(),
    addCarStateRoutes()
  ]);

  app.get('/heart-beat', (req, res)=>{res.end("hello world")});
  app.use('/',express.static('src/static'));
}

async function startServer(){
  function onError(error: NodeJS.ErrnoException) {
    if (error.syscall !== "listen") {
        throw error;
    }

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(`port requires elevated privileges`);
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(`port is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
  }

  function onListening() {
      console.log(`Listening on ${process.env.PORT}`);
  }

  await RegisterControllers();
  
  // note: the not found handler should be registered at the very end
  app.use(errorHandler);
  app.use(errorNotFoundHandler);
  const server = app.listen(Server.port, onListening);
  server.on("error", onError);
}

startServer()
    .then(x=>console.log("server started"))
    .catch((x:Error)=>console.log(x.message));