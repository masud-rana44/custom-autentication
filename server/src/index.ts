import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import * as dotenv from "dotenv";

import mongoose from "mongoose";

dotenv.config();

const app = express();

app.use(cors({ credentials: true }));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const MONGODB_URL = process.env.MONGODB_URL;

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URL);
mongoose.connection.on("connected", () => {
  console.log("mongodb connected");
});
mongoose.connection.on("error", (err: Error) => console.log(err));
