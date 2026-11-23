// Navbar.jsx - links shown at the top of every page.
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">Movie Reviews</h2>
      <div>
        {/* NavLink changes the URL without reloading the page (Chapter 27) */}
        <NavLink className="nav-link" to="/">
          All Movies
        </NavLink>
        <NavLink className="nav-link" to="/add">
          Add Movie
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
