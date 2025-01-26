import { FaRegClock, FaRegPlayCircle, FaMobileAlt } from "react-icons/fa";
import { MdOndemandVideo } from "react-icons/md";
import { IoInfinite, IoTrophyOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { createOrder } from "../store/features/orderSlice";

const CourseAd = ({ id, price, thumbnail, title }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const stripePromise = loadStripe("pk_test_51QX3eQSDOYllvf3Y8yCa5biTBfeCiKptrdKPRLHs4KUd8FMyJ6J3V4C5k6qH4Xwjqu3KsZ2d5RnNWAcM7dlX1Jtv00qXjsPx6D");

  const handlePayment = async () => {
    const stripe = await stripePromise;
    const result = await dispatch(createOrder({ courseId: id }));

    if (result.payload && result.payload.sessionId) {
      const checkoutResult = await stripe.redirectToCheckout({ sessionId: result.payload.sessionId });

      if (checkoutResult.error) {
        console.error("Error:", checkoutResult.error.message);
      }
    } else {
      console.error("Error: Order creation failed.");
    }
  };

  return (
    <div className="hidden lg:block max-w-md lg:w-1/3 mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative bg-gray-800 p-2">
        <div className="flex items-center justify-center">
          <img src={thumbnail} alt={title} className="h-52 rounded-md w-full" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="text-gray-400 hover:text-indigo-500 transition duration-300">
            <FaRegPlayCircle size={48} />
          </button>
        </div>
      </div>
      <div className="p-6">
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
          30-Day No-Money-Back Guarantee
        </div>
        <div className="mt-2">
          <div className="text-gray-800 font-bold mb-2">
            This course includes:
          </div>
          <ul className="list-none space-y-2">
            <li className="flex items-center p-1">
              <MdOndemandVideo className="text-red-500 mr-2" />
              <span className="text-gray-700">12 hours on-demand video</span>
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
