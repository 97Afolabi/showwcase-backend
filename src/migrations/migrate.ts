import "dotenv/config";
import dbConfig from "../config/database.config";

async function createSchema(): Promise<void> {
  try {
    await dbConfig.connect();

    await dbConfig.query(schema);
    console.log("Database schema created successfully.");
  } catch (err) {
    console.error("Error creating database schema:", err);
  } finally {
    await dbConfig.end();
  }
}

createSchema();

const schema = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS "education";
DROP TABLE IF EXISTS "user";

CREATE TABLE "user" (
    "id" uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    "username" character varying NOT NULL UNIQUE,
    "password" text,
    "is_active" boolean NOT NULL DEFAULT true,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE "education" (
    "id" uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" uuid NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE,
    "school" character varying NOT NULL,
    "degree" character varying NOT NULL,
    "field" character varying NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE,
    "grade" numeric(3, 2) DEFAULT 0.0,
    "description" text,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
`;
