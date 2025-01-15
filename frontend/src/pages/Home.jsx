import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import Card from "../components/Card";
import Testimonials from "../components/Testimonials";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { allCourses } from "../store/features/courseSlice";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const { courses } = useSelector((state) => state.course);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allCourses());
  }, [dispatch]);

  return (
    <>
      {user && (
        <div className="flex items-center gap-4 w-full  mx-auto px-6 py-4 shadow-sm">
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
            {user?.name.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600 text-xs font-medium">
              Welcome back
            </span>
            <h1 className="font-bold text-2xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {user?.name}
            </h1>
          </div>
        </div>
      )}
      <Banner />
      <div className="w-full mx-auto p-4">
        <div className="pb-8">
          <h1 className="font-serif text-3xl font-extrabold">
            All the skills you need in one place
          </h1>
          <p className="font-semibold text-gray-700">
            From critical skills to technical topics, Udemy supports your
            professional development.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {courses.map((course) => (
            <div
              key={course._id}
              className="flex-grow-0 flex-shrink-0 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 p-2"
            >
              <Card
                id={course._id}
                title={course.title}
                level={course.level}
                thumbnail={course.thumbnail}
                instructor={course.instructor.name}
                price={course.price}
              />
            </div>
          ))}
        </div>
        <div className="inline-block px-4 py-10">
          <Link
            to="/courses"
            className="font-bold py-3 px-8 hover:bg-indigo-500 hover:text-white rounded-md transition-all duration-300 border-2 border-black"
          >
            Explore all Courses
          </Link>
        </div>
      </div>
      <Testimonials />
    </>
  );
};

export default Home;
