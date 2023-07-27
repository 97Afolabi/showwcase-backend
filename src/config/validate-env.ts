import dotenv = require("dotenv");
import * as joi from "joi";
import * as path from "path";

dotenv.config({ path: path.join(__dirname, "../.env") });

const envVarsSchema = joi
  .object()
  .keys({
    NODE_ENV: joi
      .string()
      .valid("production", "development", "local")
      .required(),
    PORT: joi.number().positive().required().default(3000),
    JWT_SECRET: joi.string().required(),
    JWT_EXPIRES: joi.string().required(),
    POSTGRES_DB: joi.string().required(),
    POSTGRES_HOST: joi.string().required().default(5432),
    POSTGRES_PASSWORD: joi.string().required(),
    POSTGRES_PORT: joi.number().positive().required(),
    POSTGRES_USER: joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default envVars;
