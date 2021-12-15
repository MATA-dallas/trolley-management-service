import express from "express";
import logger from "morgan";
import * as path from "path";
import * as bodyParser from "body-parser"
import "express-async-errors";
import carApplication from "./application/car";
import alertApplication from './application/alert';
import utils from "./util"

import { errorHandler, errorNotFoundHandler } from "./middlewares/errorHandler";

import dataProviders from "./data-providers";
import { Server } from "./config";
import { NextFunction } from "connect";
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

async function RegisterControllers() {
  const dataProvider = await dataProviders.create();
  const util = utils.Util.create();

  const addCarRoutes = async () => {
    const data = await carApplication.data.create(dataProvider);
    const handler = await carApplication.handler.create(data);
    const router = carApplication.controller.create(handler, util);

    app.use('/cars', router);
  }
  const addAlertRoutes = async () => {
    const data = await alertApplication.data.create(dataProvider);
    const handler = await alertApplication.handler.create(data, util);
    const router = await alertApplication.controller.create(handler, util);

    app.use('/alerts', router);
  }

  await Promise.all([
    addCarRoutes(), 
    addAlertRoutes()
  ]);
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
  app.get('/', (req, res)=>{throw new Error("test")});

  // note: the not found handler should be registered at the very end
  app.use(errorHandler);
  app.use(errorNotFoundHandler);
  const server = app.listen(Server.port, onListening);
  server.on("error", onError);
}

startServer()
  .then(x=>console.log("server started"))
  .catch((x:Error)=>console.log(x.message));