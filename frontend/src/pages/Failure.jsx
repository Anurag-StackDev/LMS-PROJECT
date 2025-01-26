import { FaTimesCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Failure = () => {
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-50 text-center">
      <FaTimesCircle className="text-red-500 text-6xl mb-4" />
      <h1 className="text-4xl font-bold mb-2">Failure</h1>
      <p className="text-lg mb-6">Something went wrong. Please try again.</p>
      <button 
        className="px-6 py-3 text-white bg-red-500 rounded-md hover:bg-red-600 transition duration-300"
        onClick={handleGoHome}
      >
        Go to Home
      </button>
    </div>
  );
}

export default Failure;