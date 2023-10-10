import dotenv from "dotenv";
import { app } from "./index.js";
import connectDB from "../mongodb/connect.js";
dotenv.config();
const port = process.env.PORT || 3000;
const DB = process.env.MONGODB_URL?.replace("<password>", process.env.PASSWORD);
const startServer = async () => {
    try {
        connectDB(DB);
        app.listen(port, () => {
            console.log(`App is running on port ${port}`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
export default startServer;
//# sourceMappingURL=server.js.map