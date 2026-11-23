// AddMovie.jsx - CREATE. Shows an empty form and sends the new movie to the backend.
import { useNavigate } from "react-router-dom";
import MovieForm from "../components/MovieForm";
import { MOVIES_URL } from "../api";

const AddMovie = () => {
  const navigate = useNavigate();

  // Empty starting values: the form fields begin blank.
  const emptyMovie = { title: "", director: "", year: "", rating: "", review: "" };

  // MovieForm calls this function with the form data when the user submits.
  const handleSave = async (movieData) => {
    const response = await fetch(MOVIES_URL, {
      method: "POST", // POST = create
      headers: { "Content-Type": "application/json" }, // tells Express the body is JSON
      body: JSON.stringify(movieData), // convert the JS object to JSON text
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Unable to save the movie.");
    }
    navigate("/"); // clean-up step: go back to the list, where the new movie appears
  };

  return (
    <div>
      <h1>Add a Movie</h1>
      <MovieForm initialData={emptyMovie} buttonText="Add Movie" onSave={handleSave} />
    </div>
  );
};

export default AddMovie;
