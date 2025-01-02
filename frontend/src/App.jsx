import { Routes, Route } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Courses from "./pages/Courses";
import NavbarSmall from "./components/NavbarSmall";
import NavbarLarge from "./components/NavbarLarge";
import Course from "./pages/Course";



const App = () => {
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  return (
    <div>
      {isLargeScreen ? <NavbarLarge /> : <NavbarSmall />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/course/:id"
          element={
            <Course/>
          }
        />
        <Route path="courses" element={<Courses />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
