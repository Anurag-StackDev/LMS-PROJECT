import { Link } from "react-router-dom";

const Card = ({ id, title, level, thumbnail, instructor, price }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md w-80">
      <div className="bg-gray-200 text-center">
        <img
          src={thumbnail}
          alt={`${title} Course`}
          className="w-full h-44 rounded-md"
        />
      </div>
      <div className="p-4">
        <div className="px-2">
          <h2 className="text-lg font-bold text-gray-800 mb-1 line-clamp-2 min-h-[3.5rem]">{title}</h2>
          <div className="flex items-center mb-2">
            <span className="text-gray-800 font-semibold">Level:</span>
            <span className="bg-indigo-500 text-white px-2 rounded-md ml-2 text-xs font-bold uppercase">
              {level}
            </span>
          </div>
          <p className="text-gray-600 font-serif">{instructor}</p>
          {price && (
            <p className="text-lg font-bold text-gray-800 mb-4 ">₹{price}</p>
          )}
        </div>
        <Link to={`/course/${id}`}>
          <button className="w-full bg-indigo-500 text-white p-2 rounded-md font-bold transition duration-300 hover:bg-indigo-600">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
