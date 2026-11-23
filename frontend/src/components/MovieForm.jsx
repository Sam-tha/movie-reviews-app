// MovieForm.jsx - one form used by BOTH the Add page and the Edit page.
// Props:
//   initialData - starting values (empty for Add, the existing movie for Edit)
//   buttonText  - text on the submit button
//   onSave      - a FUNCTION passed down from the parent; we call it with the form data.
//                 This is how a child "sends data up" (Chapter 14).
import { useState } from "react";

const MovieForm = ({ initialData, buttonText, onSave }) => {
  // One useState per field (Chapter 20). Starting value comes from initialData.
  const [title, setTitle] = useState(initialData.title);
  const [director, setDirector] = useState(initialData.director);
  const [year, setYear] = useState(initialData.year);
  const [rating, setRating] = useState(initialData.rating);
  const [review, setReview] = useState(initialData.review);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop the browser from reloading the page (Chapter 24)
    setError("");
    setSaving(true);

    // Gather the state values into one object and give it to the parent.
    // Number() converts the text from the inputs into real numbers.
    try {
      await onSave({
        title: title,
        director: director,
        year: Number(year),
        rating: Number(rating),
        review: review,
      });
    } catch (saveError) {
      setError(saveError.message || "Unable to save the movie.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        {/* Controlled input: value comes from state, onChange updates state (Chapter 21) */}
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          required
        />
      </div>

      <div className="form-group">
        <label>Director</label>
        <input
          type="text"
          value={director}
          onChange={(e) => {
            setDirector(e.target.value);
          }}
          required
        />
      </div>

      <div className="form-group">
        <label>Year</label>
        <input
          type="number"
          value={year}
          onChange={(e) => {
            setYear(e.target.value);
          }}
          required
        />
      </div>

      <div className="form-group">
        <label>Rating (1 to 10)</label>
        <input
          type="number"
          min="1"
          max="10"
          value={rating}
          onChange={(e) => {
            setRating(e.target.value);
          }}
          required
        />
      </div>

      <div className="form-group">
        <label>Review</label>
        <textarea
          rows="6"
          value={review}
          onChange={(e) => {
            setReview(e.target.value);
          }}
          required
        ></textarea>
      </div>

      {error && <p role="alert">{error}</p>}
      <button className="button" type="submit" disabled={saving}>
        {saving ? "Saving..." : buttonText}
      </button>
    </form>
  );
};

export default MovieForm;
