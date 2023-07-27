import "dotenv/config";
import "reflect-metadata";
import * as express from "express";
import { Request, Response, NextFunction } from "express";
import { InversifyExpressServer, getRouteInfo } from "inversify-express-utils";
import * as passport from "passport";
import * as prettyjson from "prettyjson";
import container from "./config/inversify.config";
import logger from "./config/logger";
import { setupPassport } from "./config/passport.config";
import "./config/validate-env";
import envVars from "./config/validate-env";

const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(passport.initialize());
  setupPassport(container);

  // Logging with Winston
  app.use((req: Request, res: Response, next: NextFunction) => {
    logger.info(`${req.method.toLocaleUpperCase()} ${req.originalUrl}`);
    next();
  });
});

const app = server.build();

const routeInfo = getRouteInfo(container);

// Start the server
const port = envVars.PORT;
app.listen(port, () => {
  logger.warn(`Listening on port: ${port}`);
  logger.info(prettyjson.render({ routes: routeInfo }));
});
