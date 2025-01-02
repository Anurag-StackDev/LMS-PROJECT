import { Link } from "react-router-dom";

const Banner = () => {
    return (
      <div className="bg-[#F2F2F2] text-black py-16 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center lg:items-center justify-between space-y-8 lg:space-y-0 lg:space-x-8">
        <div className="lg:text-left lg:flex-grow flex flex-col justify-center lg:h-full">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6">
            Welcome to E-Learning
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl mb-6 max-w-md mx-auto lg:mx-0">
            Learn from the best online courses and boost your skills. Interactive lessons, expert instructors, and a vibrant community await you.
          </p>
          <div className="inline-block">
            <Link
              href="/courses"
              className="bg-indigo-500 text-white hover:bg-indigo-600 font-bold py-3 px-8 rounded-md transition-all duration-300"
            >
              Explore Courses
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-auto">
          <img
            src="./src/assets/banner.png"
            alt="Banner"
            className="max-w-full h-auto lg:max-h-96 mx-auto"
          />
        </div>
      </div>
    );
  };
  
  export default Banner;
  