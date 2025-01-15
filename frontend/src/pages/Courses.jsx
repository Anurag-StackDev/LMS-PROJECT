import { useEffect } from "react";
import CourseCard from "../components/CourseCard";
import FilterSidebar from "../components/FilterSidebar";
import { allCourses } from "../store/features/courseSlice";
import { useDispatch, useSelector } from "react-redux";

const Courses = () => {
  const { courses } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allCourses());
  }, [dispatch]);

  const user = JSON.parse(localStorage.getItem("user"));

  const filteredCourse = courses.filter((course) => {
    if (!user) return true;
    return !course.enrolledStudents.includes(user._id);
  });

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-gray-900 text-white py-4">
        <h1 className="text-3xl font-bold text-center">All Courses</h1>
      </div>
      <div className="flex flex-1 p-4 bg-gray-100 gap-2">
        <div className="hidden lg:block w-1/4">
          <FilterSidebar />
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
