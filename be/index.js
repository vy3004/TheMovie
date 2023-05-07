import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import mongoose from "mongoose";
import "dotenv/config";
import routes from "./src/routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1", router);

const port = process.env.PORT || 5000;

const server = http.createServer(app);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    server.listen(port, () => {
      console.log("Server is running on the port: " + port);
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
