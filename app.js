import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import config from './src/config/config.js';

//import routes
import { authRoutes } from "./src/index.js";

//app
const app = express();
//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//routes middleware
app.use("/api", authRoutes);

//db
import db from "./src/models/index.js";
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

//listen server
const port = config.app.PORT;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
