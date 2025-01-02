import { Link } from "react-router-dom";

const Card = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md w-80">
      <div className="bg-gray-200 p-4 text-center">
        <img
          src="./src/assets/excel-course-image.jpg"
          alt="Excel Course"
          className="w-full h-44 rounded-md"
        />
      </div>
      <div className="p-4">
        <div className="px-2">
          <h2 className="text-xl font-semibold mb-2">
            Microsoft Excel - Excel from Beginner to Advanced
          </h2>
          <div className="flex items-center mb-2">
            <span className="text-gray-800 font-semibold">Level:</span>
            <span className="bg-indigo-500 text-white px-2 rounded-md ml-2 text-xs font-bold uppercase">
              Beginner
            </span>
          </div>
          <p className="text-gray-600 font-serif">Kyle Pew, Office Newb</p>
          <p className="text-lg font-bold text-gray-800 mb-4 ">₹3,099</p>
        </div>
        <Link to={`/course/${1}`}>
          <button className="w-full bg-indigo-500 text-white p-2 rounded-md font-bold transition duration-300 hover:bg-indigo-600">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
