import { useState } from "react";
import { toast } from "react-hot-toast";
import categories from "../assets/category.json";
import { useSelector, useDispatch } from "react-redux";
import { FaPlus, FaTrash, FaUpload } from "react-icons/fa6";
import { createCourse } from "../store/features/instructorSlice";

const CreateCourse = ({ isOpen, onClose }) => {
  const { loading, message, error } = useSelector((state) => state.instructor);

  const dispatch = useDispatch();
  const [lectures, setLectures] = useState([
    {
      order: 1,
      title: "",
      video: "",
      freePreview: false,
    },
  ]);
  const [courseData, setCourseData] = useState({
    title: "",
    thumbnail: "",
    price: "",
    category: "",
    level: "Beginner",
    description: "",
  });
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const addLecture = () => {
    setLectures([
      ...lectures,
      {
        order: lectures.length + 1,
        title: "",
        video: "",
        freePreview: false,
      },
    ]);
  };

  const removeLecture = (index) => {
    const updatedLectures = lectures
      .filter((_, i) => i !== index)
      .map((lecture, idx) => ({
        ...lecture,
        order: idx + 1,
      }));
    setLectures(updatedLectures);
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Thumbnail size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
        setCourseData({ ...courseData, thumbnail: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLectureVideoChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newLectures = [...lectures];
      newLectures[index].videoPreview = URL.createObjectURL(file);
      newLectures[index].video = file;
      setLectures(newLectures);
    }
  };

  if (!isOpen) return null;

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      // Validate required fields
      if (
        !courseData.title.trim() ||
        !courseData.price ||
        !courseData.category.trim() ||
        !courseData.description.trim() ||
        !courseData.thumbnail
      ) {
        toast.error("Please fill all required fields");
        return;
      }

      // Validate price
      if (courseData.price <= 0) {
        toast.error("Price must be greater than 0");
        return;
      }

      // Validate lectures
      if (!lectures.length) {
        toast.error("Please add at least one lecture");
        return;
      }

      // Structure the course data
      const coursePayload = {
        ...courseData,
        curriculum: lectures.map((lecture, index) => ({
          order: index + 1,
          title: lecture.title.trim(),
          freePreview: lecture.freePreview,
        })),
      };

      // Append structured course data
      formData.append("courseData", JSON.stringify(coursePayload));
      formData.append("thumbnail", courseData.thumbnail);

      // Append videos
      lectures.forEach((lecture) => {
        if (lecture.video) {
          formData.append("video", lecture.video);
        }
      });

      await dispatch(createCourse(formData));

      onClose();
      toast.success(message);
    } catch {
      toast.error("Failed to create course: " + error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-4xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Create New Course</h2>

        {/* Course Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="col-span-1">
            <label className="block mb-2 text-gray-700 font-semibold">
              Course Thumbnail
            </label>
            <div className="relative h-40 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden hover:border-indigo-500 transition-colors duration-300">
              {thumbnailPreview ? (
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail preview"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-50">
                  <FaUpload className="text-gray-400 text-4xl" />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                name="thumbnail"
                onChange={handleThumbnailChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>
          <div className="col-span-2">
            <label className="block mb-2 text-gray-700 font-semibold">
              Course Title
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300"
              value={courseData.title}
              onChange={(e) =>
                setCourseData({ ...courseData, title: e.target.value })
              }
              placeholder="Enter course title"
            />
          </div>
        </div>

        {/* Lectures Section */}
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4 flex items-center justify-between">
            Course Lectures
            <button
              onClick={addLecture}
              className="flex items-center gap-2 bg-gray-700 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 text-sm"
            >
              <FaPlus size={14} /> Add New Lecture
            </button>
          </h3>
          <div className="space-y-4">
            {lectures.map((lecture, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-300 hover:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="p-3 space-y-2">
                  <div className="flex justify-between items-center hover:shadow-lg rounded-md">
                    <span className="font-bold text-gray-700 text-xs px-2">
                      Lecture {index + 1}
                    </span>
                    <button
                      onClick={() => removeLecture(index)}
                      className=" transition-colors duration-300 p-2 hover:bg-red-600 hover:text-white rounded-md"
                      title="Remove Lecture"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-1">
                    <div className="lg:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Lecture Video
                      </label>
                      <div className="relative h-48 sm:h-40 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden hover:border-indigo-500 transition-colors duration-300 group">
                        {lecture.videoPreview ? (
                          <video
                            src={lecture.videoPreview}
                            className="w-full h-full object-cover"
                            controls
                            title={lecture.title}
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full bg-gray-50 group-hover:bg-gray-100 transition-colors duration-300">
                            <FaUpload className="text-gray-400 text-3xl mb-2" />
                            <span className="text-sm text-gray-500 px-4 text-center">
                              Click or drag video to upload
                            </span>
                          </div>
                        )}
                        <input
                          type="file"
                          accept="video/*"
                          name="lecture"
                          onChange={(e) => handleLectureVideoChange(e, index)}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="lg:col-span-2 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Lecture Title
                        </label>
                        <input
                          type="text"
                          placeholder="Enter lecture Title"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300"
                          value={lecture.title}
                          onChange={(e) => {
                            const newLectures = [...lectures];
                            newLectures[index].title = e.target.value;
                            setLectures(newLectures);
                          }}
                        />
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors duration-300 px-2">
                        <input
                          type="checkbox"
                          checked={lecture.freePreview}
                          onChange={(e) => {
                            const newLectures = [...lectures];
                            newLectures[index].freePreview = e.target.checked;
                            setLectures(newLectures);
                          }}
                          className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300"
                        />
                        <span className="text-sm text-gray-700 font-medium">
                          Make this lecture free preview
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Course Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block mb-2 text-gray-700 font-semibold">
              Category
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300"
              value={courseData.category}
              onChange={(e) =>
                setCourseData({ ...courseData, category: e.target.value })
              }
            >
              {categories.map((cat) => (
                <option key={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 text-gray-700 font-semibold">
              Level
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300"
              value={courseData.level}
              onChange={(e) =>
                setCourseData({ ...courseData, level: e.target.value })
              }
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advance</option>
              <option>Expert</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-gray-700 font-semibold">
              Price ( ₹ )
            </label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300 [&::-webkit-inner-spin-button]:appearance-none"
              value={courseData.price}
              onChange={(e) =>
                setCourseData({ ...courseData, price: e.target.value })
              }
              placeholder="Enter course price"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-gray-700 font-semibold">
            Description
          </label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300 h-32"
            value={courseData.description}
            onChange={(e) =>
              setCourseData({ ...courseData, description: e.target.value })
            }
            placeholder="Enter course description"
          ></textarea>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateCourse}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-300"
          >
            {loading ? "Creating..." : "Create Course"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
