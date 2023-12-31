import * as winston from "winston";
import envVars from "./validate-env";

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.printf(
      (log) =>
        `${log.level.toLocaleUpperCase()}: ${new Date().toLocaleString(
          "en-US"
        )} - ${log.message}`
    ),
    winston.format.colorize({ all: true })
  ),
  transports: [],
});

if (envVars.NODE_ENV !== "production") {
  // don't log to console in production
  logger.add(new winston.transports.Console());
}

export default logger;
