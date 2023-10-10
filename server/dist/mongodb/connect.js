import mongoose from "mongoose";
const connectDB = (url) => {
    mongoose.set("strictQuery", true);
    mongoose
        .connect(url)
        .then(() => console.log("MongoDB Connected"))
        .catch((error) => console.log("Error", error));
};
export default connectDB;
//# sourceMappingURL=connect.js.map