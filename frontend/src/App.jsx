// App.jsx - the root component. It is made of other components (composition, Chapter 10).
import Navbar from "./components/Navbar";
import AppRoutes from "./AppRoutes";

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <AppRoutes />
      </div>
    </div>
  );
};

export default App;
