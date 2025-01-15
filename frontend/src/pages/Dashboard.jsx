import { FaCirclePlus } from "react-icons/fa6";
import { useState, useEffect } from "react";
import CreateCourse from "../components/CreateCourse";
import { useSelector, useDispatch } from "react-redux";
import {
  instructorCourses,
  deleteCourse,
} from "../store/features/instructorSlice";
import UpdateCourse from "../components/UpdateCourse";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsupdateModalOpen] = useState(false);
  const { iCourses, loading, message, error } = useSelector(
    (state) => state.instructor
  );
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(instructorCourses());
  }, []);

  const handleDelete = async (courseId) => {
    try {
      await dispatch(deleteCourse(courseId));
      toast.success(message);
    } catch {
      toast.error("Course deletion failed", error);
    }
  };
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Profile Section */}
      <div className="flex items-center gap-4 mb-8 bg-white p-2 rounded-lg shadow">
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          className="w-16 h-16 rounded-md"
        />
        <span className="text-2xl font-bold">{user.name}</span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500">Total Courses</h3>
            <p className="text-2xl font-bold">{iCourses.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500">Published Courses</h3>
            <p className="text-2xl font-bold">
              {iCourses.filter((course) => course.isPublished).length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500">Students Enrolled</h3>
            <p className="text-2xl font-bold">
              {iCourses.reduce(
                (acc, course) => acc + course.enrolledStudents.length,
                0
              )}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500">Total Income</h3>
            <p className="text-2xl font-bold">
              $
              {iCourses.reduce(
                (acc, course) =>
                  acc + course.price * course.enrolledStudents.length,
                0
              )}
            </p>
          </div>
        </div>

        {/* Graph Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Revenue Graph</h3>
          <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
            {/* Add your graph component here */}
            <span className="text-gray-500">Graph Placeholder</span>
          </div>
        </div>
      </div>

      {/* Published Courses */}
      <div className="bg-white/50 p-4 rounded-lg shadow max-w-full">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-xl font-bold">Published Courses</h3>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 bg-gray-700 hover:bg-indigo-600 text-white p-2 rounded-md"
          >
            <FaCirclePlus />
            Course
          </button>
        </div>
        <hr className="border-gray-400 mb-4 border-2 rounded-full" />
        <div className="space-y-4">
          {iCourses.map((course) => (
            <div
              key={course._id}
              className="bg-white p-4 rounded-lg shadow flex items-center gap-6"
            >
              <div className="w-48 h-32 flex-shrink-0">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex-grow flex items-center justify-between">
                <div className="space-y-2">
                  <h4 className="font-bold text-lg">{course.title}</h4>
                  <div className="space-y-1 text-gray-600">
                    <p className="font-semibold text-gray-800">
                      Price: ₹{course.price}
                    </p>
                    <p className="font-semibold">
                      Students Enrolled: {course.enrolledStudents.length}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 flex-col">
                  <button
                    onClick={() => {
                      setSelectedCourse(course);
                      setIsupdateModalOpen(true);
                    }}
                    className="bg-gray-700 hover:bg-indigo-600 text-white px-4 py-2 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="bg-gray-700 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                  >
                    {loading ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CreateCourse
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      <UpdateCourse
        course={selectedCourse}
        isOpen={isUpdateModalOpen}
        onClose={() => setIsupdateModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
