import dotenv from "dotenv";

import { app } from ".";
import connectDB from "./mongodb/connect";

dotenv.config();

const port = process.env.PORT || 3000;
const DB = process.env.MONGODB_URL?.replace(
  "<password>",
  process.env.PASSWORD!
);

const startServer = async () => {
  try {
    connectDB(DB!);

    app.listen(port, () => {
      console.log(`App is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

export default startServer;
