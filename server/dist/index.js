import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import startServer from "./server.js";
dotenv.config();
export const app = express();
app.use(cors());
app.get("/", (req, res) => {
    res.send("success");
});
startServer();
//# sourceMappingURL=index.js.map