import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import {useDispatch,useSelector} from "react-redux"
import { useEffect } from "react";
import { enrolledCourses } from "../store/features/userSlice";

const MyLearning = () => {
  const {EdCourses} = useSelector((state)=> state.user)
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = (user?.name).toLowerCase()
  
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(enrolledCourses())
  },[])

  return (
    <div>
      <div className="text-3xl font-bold text-white bg-gray-900 p-4 shadow-sm mb-6">
        My Learning
      </div>
      <div className="lg:mx-8 md:mx-6 sm:mx-4">
        <div className="flex items-center gap-6 mb-6 bg-gray-400/40 p-2 rounded-md">
          <div className="flex items-center gap-2">
            <label htmlFor="sortBy" className=" font-medium">
              Sort by:
            </label>
            <select
              id="sortBy"
              className="border border-gray-200 rounded-md p-1 focus:outline-none"
            >
              <option value="recent">Most Recent</option>
              <option value="title">Title A-Z</option>
              <option value="progress">Progress</option>
              <option value="instructor">Instructor</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="category" className=" font-medium">
              Category:
            </label>
            <select
              id="category"
              className="border border-gray-200 rounded-md p-1 focus:outline-none"
            >
              <option value="all">All Categories</option>
              <option value="web">Web Development</option>
              <option value="mobile">Mobile Development</option>
              <option value="data">Data Science</option>
              <option value="programming">Programming</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {EdCourses.map((course) => (
            <Link
              key={course._id}
              to={`/${userName}/enrolled/${course._id}`}
              className="transform hover:scale-105 transition-transform duration-300">
            
              <div className="bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden flex flex-col h-[340px]">
                <div className="relative h-48 flex-shrink-0 group">
                  <div className="absolute inset-0 bg-gray-800/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <FaPlay className="text-white text-4xl" />
                  </div>
                  <img
                    src={course.thumbnail}
                    alt={`${course.title} Course`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 flex flex-col flex-grow">
                  <div className="flex-shrink-0">
                    <h2 className="text-lg font-bold text-gray-800 mb-1 line-clamp-2 min-h-[3.5rem]">
                      {course.title}
                    </h2>

                    <p className="text-gray-600 font-medium mb-1">
                      {course.instructor.name}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-1">
                    <div className="w-full bg-indigo-600  h-0.5 mb-1">
                      <div
                        className="bg-gray-200 h-0.5  transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">
                        Progress
                      </span>
                      <span className="text-sm font-semibold">
                        {course.progress > 0 ? course.progress : 0}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyLearning;
