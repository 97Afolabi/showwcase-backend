import "dotenv/config";
import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import container from "./config/inversify.config";
import { Request, Response, NextFunction } from "express";
import * as bodyparser from "body-parser";
import logger from "./config/logger";

const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(bodyparser.urlencoded({ extended: true }));
  app.use(bodyparser.json());

  // Logging with Winston
  app.use((req: Request, res: Response, next: NextFunction) => {
    logger.info(`${req.method.toLocaleUpperCase()} ${req.originalUrl}`);
    next();
  });
});

const app = server.build();

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  logger.info(`Listening on port: ${port}`);
});
