// db.js - connects our app to MongoDB. Kept in its own file so it is easy to find.
import mongoose from "mongoose";

// Local MongoDB address. "moviereviews" is the database name (MongoDB creates it automatically).
// If you use MongoDB Atlas, replace this with your Atlas connection string.
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/moviereviews";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    // If the database is not running, there is no point in keeping the server alive.
    console.log("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
