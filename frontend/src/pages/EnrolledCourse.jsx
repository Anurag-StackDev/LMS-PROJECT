import ReactPlayer from "react-player";
import { GoTrophy } from "react-icons/go";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import CourseDetails from "../components/CourseDetails";
import { enrolledCourse } from "../store/features/userSlice";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import {
  getProgress,
  updateProgress,
} from "../store/features/courseProgressSlice";

const EnrolledCourse = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { EdCourse } = useSelector((state) => state.user);
  const { progress } = useSelector((state) => state.courseProgress);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressData, setProgressData] = useState({
    courseId: "",
    lectureId: "",
    viewed: false,
  });
  const [selectedLecture, setSelectedLecture] = useState(0);
  const [isVideoSectionOpen, setIsVideoSectionOpen] = useState(true);

  useEffect(() => {
    dispatch(enrolledCourse(courseId));
    dispatch(getProgress(courseId));
  }, [dispatch, courseId]);

  useEffect(() => {
    if (
      progressData.courseId &&
      progressData.lectureId &&
      progressData.viewed
    ) {
      console.log(progressData);
      dispatch(updateProgress(progressData));
    }
  }, [dispatch, progressData]);

  const isSmallScreen = useMediaQuery({ query: "(max-width: 640px)" });
  const isMediumScreen = useMediaQuery({ query: "(max-width: 1024px)" });

  const toggleVideoSection = (e) => {
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
            <div
              className="relative rounded-lg overflow-hidden"
            >
              <ReactPlayer
                url={EdCourse?.curriculum[selectedLecture].videoUrl}
                controls
                width={width}
                height={height}
                playing={true}
                muted={true}
                onClick={handlePlayClick}
                onProgress={(state) => {
                  if (state.played === 1) {
                    setProgressData({
                      courseId: EdCourse._id,
                      lectureId: EdCourse.curriculum[selectedLecture]._id,
                      viewd: true,
                    });
                  }
                }}
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
              {EdCourse?.curriculum.map((lecture, index) => (
                <div
                  key={lecture._id}
                  onClick={() => setSelectedLecture(index)}
                  className={`course-video-item p-4 cursor-pointer rounded-md transition-all duration-200 ${
                    selectedLecture === index
                      ? "bg-blue-50 border-l-4 border-gray-500"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <h4
                    className={`font-medium ${
                      selectedLecture === index
                        ? "text-indigo-600"
                        : "text-gray-700"
                    }`}
                  >
                    {lecture.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <CourseDetails
        title={EdCourse?.title}
        description={EdCourse?.description}
        instructorName={EdCourse?.instructor.name}
        instructorImage={EdCourse?.instructor.imageUrl}
        enrolled={true}
      />
    </div>
  );
};

export default EnrolledCourse;
