import { FaRegPlayCircle, FaRegClock, FaPlayCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { createOrder } from "../store/features/orderSlice";

const CourseDetails = ({
  id,
  title,
  description,
  price,
  thumbnail,
  level,
  courseContent,
  instructorName,
  instructorImage,
}) => {
  const { user } = useSelector((state) => state.auth);
  const { sessionId } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const stripePromise = loadStripe("pk_test_51QX3eQSDOYllvf3Y8yCa5biTBfeCiKptrdKPRLHs4KUd8FMyJ6J3V4C5k6qH4Xwjqu3KsZ2d5RnNWAcM7dlX1Jtv00qXjsPx6D");

  const handlePayment = async () => {
    const stripe = await stripePromise;
    await dispatch(createOrder({ courseId: id }));
    
    if (sessionId) {
      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        console.error("Error:", result.error.message);
      }
    } else {
      console.error("Error: Order creation failed.");
    }
  };

  return (
    <div className="flex-1 p-8">
      {/* Course Player section */}
      <div className="block lg:hidden pb-10">
        <div className="relative bg-gray-800 p-1 rounded-md">
          <div className="flex items-center justify-center">
            <img
              src={thumbnail}
              alt={title}
              className="sm:h-64 md:h-96 rounded-md"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="text-gray-400 hover:text-indigo-500 transition duration-300">
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

      {/* Course price section */}
      <div className="mt-8 block lg:hidden">
        <div className="text-3xl font-bold text-gray-800">{price}</div>
        <div className="flex items-center text-sm text-gray-500 mt-2">
          <FaRegClock className="text-red-600 mr-1" /> 12 hours left at this
          price!
        </div>
        <div className="mt-6">
          <button
            onClick={user ? handlePayment : () => navigate("/auth")}
            className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600"
          >
            Buy Now
          </button>
        </div>
        <div className="text-center text-sm text-gray-500 mt-4">
          30-Day Money-Back Guarantee
        </div>
      </div>

      {/* Course content section */}
      {courseContent && (
        <div className="mt-8">
          <h2 className="text-gray-900 text-2xl font-semibold">
            Course Content
          </h2>
          <div className="mt-4 bg-gray-100 rounded-lg p-4">
            <ul className="divide-y divide-gray-200">
              {courseContent?.map((video, index) => (
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
                      {video.freePreview && (
                        <div className="text-xs ml-auto hover:bg-indigo-600 rounded-md hover:text-white px-2 font-semibold">
                          Free Preview
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Instructor section */}
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
