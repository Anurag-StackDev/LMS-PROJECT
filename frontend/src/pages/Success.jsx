import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { handlePaymentSuccess } from "../store/features/orderSlice";

const Success = () => {
  const dispatch = useDispatch();
  const { session_id: sessionId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionId) {
      dispatch(handlePaymentSuccess(sessionId));
    }
  }, [dispatch, sessionId]);

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-50 text-center">
      <FaCheckCircle className="text-green-500 text-6xl mb-4" />
      <h1 className="text-4xl font-bold mb-2">Success!</h1>
      <p className="text-lg mb-6">Your operation was completed successfully.</p>
      <button
        className="px-6 py-3 text-white bg-green-500 rounded-md hover:bg-green-600 transition duration-300"
        onClick={handleGoHome}
      >
        Go to Home
      </button>
    </div>
  );
};

export default Success;
