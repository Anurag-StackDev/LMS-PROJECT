import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";

const MyLearning = () => {
  const courses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      level: "Beginner",
      instructor: "John Doe",
      thumbnail: "https://via.placeholder.com/300x200",
      progress: 75,
    },
    {
      id: 2,
      title: "Advanced JavaScript Masterclass",
      level: "Advanced",
      instructor: "Jane Smith",
      thumbnail: "https://via.placeholder.com/300x200",
      progress: 30,
    },
    {
      id: 3,
      title: "Python Programming for Data Science",
      level: "Intermediate",
      instructor: "Mike Johnson",
      thumbnail: "https://via.placeholder.com/300x200",
      progress: 50,
    },
    {
      id: 4,
      title: "Mobile App Development with React Native",
      level: "Intermediate",
      instructor: "Sarah Wilson",
      thumbnail: "https://via.placeholder.com/300x200",
      progress: 90,
    },
  ];

  return (
    <div className="max-w-max">
      <div className="text-3xl font-bold text-white bg-gray-900 p-4 shadow-sm mb-6">
        My Learning
      </div>
      <div className="lg:mx-10 md:mx-8 sm:mx-6">
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
          {courses.map((course) => (
            <Link
              to={`/course/${course.id}`}
              key={course.id}
              className="transform hover:scale-105 transition-transform duration-300"
            >
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
                      {course.instructor}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-1">
                    <div className="w-full bg-gray-200  h-0.5 mb-1">
                      <div
                        className="bg-indigo-600 h-0.5  transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">
                        Progress
                      </span>
                      <span className="text-sm font-semibold text-indigo-600">
                        {course.progress}%
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
