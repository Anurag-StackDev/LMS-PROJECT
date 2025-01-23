import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import FilterSidebar from "../components/FilterSidebar";
import { allCourses } from "../store/features/courseSlice";
import { useDispatch, useSelector } from "react-redux";

const Courses = () => {
  const { courses, searchResults } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allCourses());
  }, [dispatch]);

  const user = JSON.parse(localStorage.getItem("user"));

  const [filters, setFilters] = useState({
    categories: [],
    levels: [],
    prices: [],
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredCourse = (
    searchResults.length ? searchResults : courses
  ).filter((course) => {
    if (!user) return true;

    const matchesCategory = filters.categories.length
      ? filters.categories.includes(course.category)
      : true;
    const matchesLevel = filters.levels.length
      ? filters.levels.includes(course.level)
      : true;
    const matchesPrice = filters.prices.length
      ? filters.prices.includes(course.price === 0 ? "Free" : "Paid")
      : true;

    return (
      !course.enrolledStudents.includes(user._id) &&
      matchesCategory &&
      matchesLevel &&
      matchesPrice
    );
  });

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-gray-900 text-white">
        <h1 className="text-3xl font-bold text-center p-4">All Courses</h1>
      </div>
      <div className="w-full ">
        {searchResults.length ? (
          <h2 className="text-2xl font-bold  px-4 pt-2">
            {searchResults.length} results found
          </h2>
        ) : (
          ""
        )}
      </div>
      <div className="flex flex-1 px-6 py-4 bg-gray-100 gap-2">
        <div className="hidden lg:block w-1/4">
          <FilterSidebar onFilterChange={handleFilterChange} />
        </div>
        <div className="w-full lg:w-3/4 flex flex-wrap gap-6 justify-center px-2 lg:px-4">
          {filteredCourse.map((course, index) => (
            <div key={index} className="w-full">
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
