// EditMovie.jsx - UPDATE. Loads the existing movie, fills the form with it, and saves changes.
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MovieForm from "../components/MovieForm";

const EditMovie = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  // First load the current movie so we can pre-fill the form.
  useEffect(() => {
    const getMovie = async () => {
      const response = await fetch(`http://localhost:8000/movies/${params.id}`);
      const data = await response.json();
      setMovie(data);
    };
    getMovie();
  }, [params.id]);

  const handleSave = async (movieData) => {
    await fetch(`http://localhost:8000/movies/${params.id}`, {
      method: "PUT", // PUT = update
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movieData),
    });
    navigate(`/movie/${params.id}`); // go back to this movie's detail page
  };

  // We only show the form AFTER the movie has loaded. This matters because
  // useState(initialData.title) only reads its starting value on the first render,
  // so the data must already be here by then.
  return (
    <div>
      <h1>Edit Movie</h1>
      {movie === null ? (
        <p>Loading...</p>
      ) : movie.message ? (
        <p>{movie.message}</p>
      ) : (
        <MovieForm initialData={movie} buttonText="Save Changes" onSave={handleSave} />
      )}
    </div>
  );
};

export default EditMovie;
