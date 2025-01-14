import ReactPlayer from "react-player";
import { GoTrophy } from "react-icons/go";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useMediaQuery } from "react-responsive";
import CourseDetails from "../components/CourseDetails";
import { courseData } from '../assets/courseData';

const EnrolledCourse = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(0);
  const [isVideoSectionOpen, setIsVideoSectionOpen] = useState(true);

  const isSmallScreen = useMediaQuery({ query: "(max-width: 640px)" });
  const isMediumScreen = useMediaQuery({ query: "(max-width: 1024px)" });

  // Get the first course data as default
  const {
    title,
    description,
    instructorName,
    instructorImage
  } = courseData[0];

  // Example course content (you would fetch this from your backend)
  const courseVideos = [
    { id: 1, title: "Introduction to the Course", url: "video-url-1" },
    { id: 2, title: "Chapter 1: Getting Started", url: "video-url-2" },
    { id: 3, title: "Chapter 2: Basic Concepts", url: "video-url-3" },
    { id: 4, title: "Chapter 3: Advanced Topics", url: "video-url-4" },
  ];

  const toggleVideoSection = (e) => {
    // Prevent the click event from triggering when clicking on course videos
    if (e.target.closest(".course-video-item")) {
      return;
    }
    setIsVideoSectionOpen(!isVideoSectionOpen);
  };

  const getPlayerDimensions = () => {
    if (isSmallScreen) {
      return {
        width: "100%",
        height: "240px",
      };
    } else if (isMediumScreen) {
      return {
        width: "100%",
        height: "360px",
      };
    } else {
      return {
        width: "100%",
        height: "500px",
      };
    }
  };

  const { width, height } = getPlayerDimensions();

  const handlePlayClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto p-4">
        <div className="flex flex-col lg:flex-row gap-6 bg-white rounded-md shadow-md p-6">
          <div className="flex-1">
            <div className="relative rounded-lg overflow-hidden" onClick={handlePlayClick}>
              <ReactPlayer
                url={courseVideos[selectedVideo].url}
                controls
                width={width}
                height={height}
                playing={isPlaying}
                onProgress={(state) => setProgress(state.played * 100)}
              />
            </div>
            <div className="p-2">
              <div className="flex items-center justify-end mt-2">
                <GoTrophy className="text-yellow-500 mr-2" />
                <span className="text-gray-700 font-medium">
                  Progress: {Math.round(progress)}%
                </span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-96 bg-white rounded-md shadow-md p-4">
            <div
              className="flex justify-between items-center mb-4 cursor-pointer lg:cursor-default"
              onClick={toggleVideoSection}
            >
              <h3 className="text-xl font-bold text-gray-800">
                Course Content
              </h3>
              <span className="lg:hidden">
                {isVideoSectionOpen ? (
                  <IoIosArrowUp size={24} className="text-gray-600" />
                ) : (
                  <IoIosArrowDown size={24} className="text-gray-600" />
                )}
              </span>
            </div>
            <div
              className={`${
                isVideoSectionOpen ? "block" : "hidden lg:block"
              } space-y-2`}
            >
              {courseVideos.map((video, index) => (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(index)}
                  className={`course-video-item p-4 cursor-pointer rounded-md transition-all duration-200 ${
                    selectedVideo === index
                      ? "bg-blue-50 border-l-4 border-gray-500"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <h4
                    className={`font-medium ${
                      selectedVideo === index
                        ? "text-indigo-600"
                        : "text-gray-700"
                    }`}
                  >
                    {video.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <CourseDetails 
        title={title}
        description={description}
        instructorName={instructorName}
        instructorImage={instructorImage}
        enrolled={true}
      />
    </div>
  );
};

export default EnrolledCourse;
