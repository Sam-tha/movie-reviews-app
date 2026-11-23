// server.js - the entry point. Run it with: npm start
import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import movieRoutes from "./routes/movieRoutes.js";

const app = express();
const PORT = Number(process.env.PORT || 8000); // React (Vite) runs on 5173, so the backend uses a different port

// Middleware = code that runs on every request BEFORE our routes.
app.use(cors());         // allows the React app (another port) to call this server
app.use(express.json()); // lets us read JSON sent in req.body

// Every route inside movieRoutes starts with /movies
// e.g. GET http://localhost:8000/movies
app.use("/movies", movieRoutes);

// Connect to the database first, then start listening for requests.
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
