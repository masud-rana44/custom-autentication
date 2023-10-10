import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";

import startServer from "./server";

dotenv.config();

export const app = express();
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("success");
});

startServer();
