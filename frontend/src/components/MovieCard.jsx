// MovieCard.jsx - shows ONE movie in the list. It gets its data through props (Chapter 13).
import { NavLink } from "react-router-dom";

// Props are destructured right in the parameters.
// year and rating are numbers, so the parent passes them with { } (not quotes).
const MovieCard = ({ id, title, director, year, rating }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>Directed by {director}</p>
      <p>
        {year} - Rating: {rating}/10
      </p>
      {/* Template string builds a URL like /movie/65f1... for this specific movie */}
      <NavLink className="button" to={`/movie/${id}`}>
        Read review
      </NavLink>
    </div>
  );
};

export default MovieCard;
