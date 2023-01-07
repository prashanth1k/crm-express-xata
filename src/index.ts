import express, { Express } from "express";
import dotenv from "dotenv";

import testapi from "./services/testapi";
import contact from "./services/contact";
import activity from "./services/activity";

// read env file
dotenv.config();

// initialize
const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use("/", testapi);
app.use("/api/contact/", contact);
app.use("/api/activity/", activity);

app.listen(port, () => {
  console.log("Express server listening on port", port);
});
