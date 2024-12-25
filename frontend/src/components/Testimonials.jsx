import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";

const Testimonials = () => {
  return (
    <div className="bg-gray-100 px-4 font-serif pb-10">
      <h2 className="text-3xl font-extrabold text-gray-800 py-8">
        See what others are achieving through learning
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <FaQuoteLeft className="text-purple-600 mb-4" />
          <p className="text-xs font-semibold mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac
            orci velit.
          </p>
          <FaQuoteRight className="text-purple-600 mb-4" />
          <div className="flex gap-2 items-center mb-4">
            <BsPersonCircle size={32} />
            <div>
              <p className="text-gray-600 text-xs">John Doe</p>
              <p className="text-gray-600 text-xs">Some Company</p>
            </div>
          </div>
          <a href="#" className="text-purple-600 hover:underline text-xs">
            View courses &gt;
          </a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <FaQuoteLeft className="text-purple-600 mb-4" />
          <p className="text-xs font-semibold mb-4">
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <FaQuoteRight className="text-purple-600 mb-4" />
          <div className="flex gap-2 items-center mb-4">
            <BsPersonCircle size={32} />
            <div>
              <p className="text-gray-600 text-xs">John Doe</p>
              <p className="text-gray-600 text-xs">Some Company</p>
            </div>
          </div>
          <a href="#" className="text-purple-600 hover:underline text-xs">
            View more &gt;
          </a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <FaQuoteLeft className="text-purple-600 mb-4" />
          <p className="text-xs font-semibold mb-4">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi.
          </p>
          <FaQuoteRight className="text-purple-600 mb-4" />
          <div className="flex gap-2 items-center mb-4">
            <BsPersonCircle size={32} />
            <div>
              <p className="text-gray-600 text-xs">John Doe</p>
              <p className="text-gray-600 text-xs">Some Company</p>
            </div>
          </div>
          <a href="#" className="text-purple-600 hover:underline text-xs">
            Read more &gt;
          </a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <FaQuoteLeft className="text-purple-600 mb-4" />
          <p className="text-xs font-semibold mb-4">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore.
          </p>
          <FaQuoteRight className="text-purple-600 mb-4" />
          <div className="flex gap-2 items-center mb-4">
            <BsPersonCircle size={32} />
            <div>
              <p className="text-gray-600 text-xs">John Doe</p>
              <p className="text-gray-600 text-xs">Some Company</p>
            </div>
          </div>
          <a href="#" className="text-purple-600 hover:underline text-xs">
            Learn more &gt;
          </a>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
