import { FaPlayCircle, FaRegClock, FaRegPlayCircle } from "react-icons/fa";

const CourseDetails = ({
  title,
  description,
  level,
  courseContent,
  instructorName,
  instructorImage,
}) => {
  return (
    <div className="flex-1 p-8">
      <div className="block lg:hidden pb-10">
        <div className="relative bg-gray-800 p-6">
          <div className="flex items-center justify-center">
            <img
              src="aws-certified-security-specialty.png"
              alt="AWS Certified Security Specialty"
              className="h-60"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="text-gray-400">
              <FaRegPlayCircle size={44} />
            </button>
          </div>
        </div>
      </div>
      <h1 className="text-gray-900 text-3xl xl:text-4xl font-semibold leading-tight">
        {title}
      </h1>
      <div className="mt-4">
        <span className="font-semibold text-gray-700 text-xl">Level:</span>
        <span className="text-gray-700 text-xl ml-2">{level}</span>
      </div>
      <p className="text-gray-700 mt-6 text-lg xl:text-xl">{description}</p>
      <div className="mt-8 block lg:hidden">
        <div className="text-3xl font-bold text-gray-800">₹549</div>
        <div className="flex items-center text-sm text-gray-500 mt-2">
          <FaRegClock className="text-red-600 mr-1" /> 12 hours left at this
          price!
        </div>
        <div className="mt-6">
          <button className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600">
            Add to cart
          </button>
        </div>
        <div className="text-center text-sm text-gray-500 mt-4">
          30-Day Money-Back Guarantee
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-gray-900 text-2xl font-semibold">Course Content</h2>
        <div className="mt-4 bg-gray-100 rounded-lg p-4">
          <ul className="divide-y divide-gray-200">
            {courseContent.map((video, index) => (
              <li
                key={index}
                className="px-6 py-4 whitespace-nowrap hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <div className="text-gray-500">
                    <FaPlayCircle size={20} />
                  </div>
                  <div className="ml-4 flex justify-between w-full">
                    <div className="text-sm font-medium text-gray-900">
                      {video.title}
                    </div>
                    {video.duration && (
                      <div className="text-sm text-gray-500 ml-auto">
                        {video.duration}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-8 flex items-center">
        <img
          className="w-16 h-16 rounded-full mr-4"
          src={instructorImage}
          alt={`${instructorName}'s profile`}
        />
        <div>
          <p className="text-gray-900 text-xl font-semibold">
            {instructorName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
