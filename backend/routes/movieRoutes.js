// routes/movieRoutes.js - the 5 CRUD routes. Each one is: receive request -> talk to DB -> send response.
import express from "express";
import Movie from "../models/Movie.js";

const router = express.Router();

// CREATE - POST /movies
// The React form sends the new movie as JSON; express.json() puts it in req.body.
router.post("/", async (req, res) => {
  try {
    const movie = await Movie.create(req.body); // saves a new document in MongoDB
    res.status(201).json(movie);                // 201 = "created"; send the saved movie back
  } catch (error) {
    res.status(400).json({ message: error.message }); // 400 = bad data (e.g. missing title)
  }
});

// READ ALL - GET /movies
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 }); // newest first
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message }); // 500 = something broke on the server
  }
});

// READ ONE - GET /movies/:id
// ":id" is a dynamic segment, just like in React Router. We read it with req.params.id.
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" }); // 404 = not found
    }
    res.json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message }); // e.g. the id is not a valid format
  }
});

// UPDATE - PUT /movies/:id
router.put("/:id", async (req, res) => {
  try {
    // { new: true } makes Mongoose return the UPDATED movie instead of the old one.
    // { runValidators: true } makes the schema rules (required, min, max) apply to updates too.
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - DELETE /movies/:id
router.delete("/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json({ message: "Movie deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
