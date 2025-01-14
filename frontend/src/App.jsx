import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { handleRefreshToken } from "./store/features/authSlice.js";

//Pages
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Courses from "./pages/Courses";
import NavbarSmall from "./components/NavbarSmall";
import NavbarLarge from "./components/NavbarLarge";
import Course from "./pages/Course";
import EnrolledCourse from "./pages/EnrolledCourse";
import MyLearning from "./pages/MyLearning";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import Orders from "./pages/Orders.jsx";

const App = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const userName = user?.name || '';

  useEffect(() => {
    dispatch(handleRefreshToken()).catch(error => {
      console.error("Error refreshing token:", error);
    });
  }, [dispatch]);

  const isLargeScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  
  return (
    <>
      <Toaster />
      {isLargeScreen ? <NavbarLarge /> : <NavbarSmall />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={<Course />} />
        {isAuthenticated && userName && (
          <Route path={`${userName}`}>
            <Route path="my-learning" element={<MyLearning />} />
            <Route path="enrolled/:id" element={<EnrolledCourse />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        )}
        {isAuthenticated && user?.role === "instructor" ? (
          <Route path="admin">
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        ) : (
          <Route path="admin/*" element={<Navigate to="/" />} />
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;

