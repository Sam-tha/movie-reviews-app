// MovieList.jsx - READ ALL. Fetches every movie from the backend and shows a card for each.
import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

const MovieList = () => {
  // Starts as an empty array; we fill it after the data arrives from the backend.
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect with [] runs ONCE, when the page first appears (guide Chapter 35).
  // This is where we load data from the backend.
  useEffect(() => {
    const getMovies = async () => {
      const response = await fetch("http://localhost:8000/movies"); // GET request
      const data = await response.json(); // turn the JSON text into a JS array
      setMovies(data); // saving it in state triggers a re-render with the data
      setLoading(false);
    };
    getMovies();
  }, []);

  return (
    <div>
      <h1>All Movies</h1>
      {/* Ternary (Chapter 19): show a message while loading, otherwise the list */}
      {loading ? (
        <p>Loading...</p>
      ) : movies.length === 0 ? (
        <p>No movies yet. Click "Add Movie" to create one.</p>
      ) : (
        <div className="grid">
          {/* .map() turns each movie object into a card (Chapter 12). key must be unique. */}
          {movies.map((movie) => {
            return (
              <MovieCard
                key={movie._id}
                id={movie._id}
                title={movie.title}
                director={movie.director}
                year={movie.year}
                rating={movie.rating}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MovieList;
