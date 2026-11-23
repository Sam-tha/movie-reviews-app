// MovieDetail.jsx - READ ONE + DELETE. Shows a single movie's full review.
import { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";

const MovieDetail = () => {
  const params = useParams(); // reads :id from the URL /movie/:id (Chapter 30)
  const navigate = useNavigate(); // lets us change the page from code (Chapter 28)
  const [movie, setMovie] = useState(null); // null = "not loaded yet"

  // Load the one movie whose id is in the URL.
  useEffect(() => {
    const getMovie = async () => {
      const response = await fetch(`http://localhost:8000/movies/${params.id}`);
      const data = await response.json();
      setMovie(data);
    };
    getMovie();
  }, [params.id]); // run again if the id in the URL changes

  const handleDelete = async () => {
    // Ask first so a misclick does not delete the movie.
    const sure = window.confirm("Delete this movie?");
    if (!sure) {
      return;
    }
    await fetch(`http://localhost:8000/movies/${params.id}`, {
      method: "DELETE",
    });
    navigate("/"); // go back to the list after deleting
  };

  // The ternary shows "Loading..." until the movie arrives. Without this,
  // movie.title would crash because movie is still null.
  return (
    <div>
      {movie === null ? (
        <p>Loading...</p>
      ) : movie.message ? (
        // the backend sends { message: "Movie not found" } when the id is wrong
        <p>{movie.message}</p>
      ) : (
        <div className="detail">
          <h1>{movie.title}</h1>
          <p>
            Directed by {movie.director} ({movie.year})
          </p>
          <p className="rating">Rating: {movie.rating}/10</p>
          <p>{movie.review}</p>
          <p className="date">
            Added on {new Date(movie.createdAt).toLocaleDateString()}
          </p>

          <NavLink className="button" to={`/edit/${movie._id}`}>
            Edit
          </NavLink>
          <button className="button danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
