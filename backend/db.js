// db.js - connects our app to MongoDB. Kept in its own file so it is easy to find.
import mongoose from "mongoose";

// Keep production credentials in the environment, never in source control.
const MONGO_URL =
  process.env.MONGO_URL ||
  (process.env.NODE_ENV === "production"
    ? null
    : "mongodb://127.0.0.1:27017/moviereviews");

const connectDB = async () => {
  try {
    if (!MONGO_URL) {
      throw new Error("MONGO_URL must be set in production.");
    }
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    // If the database is not running, there is no point in keeping the server alive.
    console.log("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
