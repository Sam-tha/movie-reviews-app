// models/Movie.js - the schema describes what ONE movie review looks like in MongoDB.
import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },    // required: saving fails without it
  director: { type: String, required: true },
  year: { type: Number, required: true },
  rating: { type: Number, required: true, min: 1, max: 10 }, // score out of 10
  review: { type: String, required: true },   // the review text
  createdAt: { type: Date, default: Date.now }, // filled in automatically
});

// A model is the tool we use to talk to the "movies" collection (Mongoose pluralizes "Movie").
const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
