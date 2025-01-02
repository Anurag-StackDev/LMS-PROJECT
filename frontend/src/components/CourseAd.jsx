import { FaRegClock, FaRegPlayCircle, FaMobileAlt } from "react-icons/fa";
import { MdOndemandVideo } from "react-icons/md";
import { IoInfinite, IoTrophyOutline } from "react-icons/io5";

const CourseAd = () => {
  return (
    <div className="hidden lg:block max-w-md lg:w-1/3 mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative bg-gray-800 p-6">
        <div className="flex items-center justify-center">
          <img
            src="aws-certified-security-specialty.png"
            alt="AWS Certified Security Specialty"
            className="h-44"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="text-gray-400">
            <FaRegPlayCircle size={44} />
          </button>
        </div>
      </div>
      <div className="p-6">
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
        <div className="mt-3">
          <button className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300">
            Buy now
          </button>
        </div>
        <div className="text-center text-sm text-gray-500 mt-4">
          30-Day Money-Back Guarantee
        </div>
        <div className="mt-4">
          <div className="text-gray-800 font-bold mb-2">
            This course includes:
          </div>
          <ul className="list-none space-y-2">
            <li className="flex items-center p-1">
              <MdOndemandVideo className="text-red-500 mr-2" />
              <span className="text-gray-700">7.5 hours on-demand video</span>
            </li>
            <li className="flex items-center p-1">
              <FaMobileAlt className="text-red-500 mr-2" />
              <span className="text-gray-700">Access on mobile and TV</span>
            </li>
            <li className="flex items-center p-1">
              <IoInfinite className="text-red-500 mr-2" />
              <span className="text-gray-700">Full lifetime access</span>
            </li>
            <li className="flex items-center p-1">
              <IoTrophyOutline className="text-red-500 mr-2" />
              <span className="text-gray-700">Certificate of completion</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseAd;
