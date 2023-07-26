import "dotenv/config";
import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import container from "./config/inversify.config";
import * as bodyparser from "body-parser";

const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(bodyparser.urlencoded({ extended: true }));
  app.use(bodyparser.json());
});

const app = server.build();

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
