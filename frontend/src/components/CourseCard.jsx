import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  const { _id, title, description, instructor, level, price, thumbnail } = course;
  return (
    <Link to={`/course/${_id}`}>
      <div className="max-w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex flex-col sm:flex-row md:flex-row lg:flex-row">
        <div className="bg-gray-200 p-0 md:p-2 lg:p-4 flex-shrink-0 flex items-center justify-center w-full sm:w-full md:w-1/3 lg:w-2/6">
          <img
            className="w-full h-32 sm:h-32 md:h-36 lg:h-40 object-contain"
            src={thumbnail}
            alt={`${title} Logo`}
          />
        </div>
        <div className="p-4 sm:p-6 md:p-6 lg:p-8 flex-1">
          <h3 className="text-gray-900 text-lg font-semibold leading-tight">
            {title}
          </h3>
          <div className="hidden sm:block md:flex lg:flex mt-2">
            <span className="font-semibold text-gray-700 text-sm">Level:</span>
            <span className="text-gray-700 text-sm ml-2">{level}</span>
          </div>

          <p className="text-gray-700 mt-3 text-sm hidden lg:block">
            {description}
          </p>
          <div className="flex items-center mt-4">
            <img
              className="w-12 h-12 rounded-full mr-4 border-2 border-gray-800"
              src={instructor?.imageUrl}
              alt={`${instructor?.name}'s profile`}
            />
            <div>
              <p className="text-gray-900 font-semibold">{instructor?.name}</p>
            </div>
          </div>
          <div className="flex items-center mt-2">
            <span className="text-gray-900 text-xl font-bold">₹{price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
