import { Pool } from "pg";
import envVars from "./validate-env";

const dbConfig = new Pool({
  host: envVars.POSTGRES_HOST,
  port: parseInt(envVars.POSTGRES_PORT),
  database: envVars.POSTGRES_DB,
  user: envVars.POSTGRES_USER,
  password: envVars.POSTGRES_PASSWORD,
  max: 20,
});

export default dbConfig;
