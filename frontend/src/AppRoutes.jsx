// AppRoutes.jsx - maps each URL to the page that should show (Chapter 26).
import { Routes, Route } from "react-router-dom";
import MovieList from "./pages/MovieList";
import MovieDetail from "./pages/MovieDetail";
import AddMovie from "./pages/AddMovie";
import EditMovie from "./pages/EditMovie";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MovieList />}></Route>
      <Route path="/add" element={<AddMovie />}></Route>
      {/* :id is a dynamic segment (Chapter 29): /movie/abc123 matches this one route */}
      <Route path="/movie/:id" element={<MovieDetail />}></Route>
      <Route path="/edit/:id" element={<EditMovie />}></Route>
    </Routes>
  );
};

export default AppRoutes;
