import mongoose from "mongoose";

const connectDB = (url: string) => {
  mongoose.Promise = Promise;
  mongoose.connect(url);
  mongoose.connection.on("connected", () => {
    console.log("mongodb connected");
  });
  mongoose.connection.on("error", (err: Error) => console.log(err));
};

export default connectDB;
