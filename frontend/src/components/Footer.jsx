import { FaFacebookF, FaTwitter, FaInstagram, FaGlobe } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white w-full">
      <div className="mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="text-2xl font-extrabold">
          E-Learning
        </div>
        <div className="flex space-x-6">
          <Link to="/about" className="hover:underline">About Us</Link>
          <Link to="/courses" className="hover:underline">Courses</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <FaGlobe className="mr-2" size={24} />
            <span>English</span>
          </div>
          <div className="flex space-x-4">
            <Link to="#" aria-label="Facebook" className="hover:text-indigo-500">
              <FaFacebookF size={24} />
            </Link>
            <Link to="#" aria-label="Twitter" className="hover:text-indigo-500">
              <FaTwitter size={24} />
            </Link>
            <Link to="#" aria-label="Instagram" className="hover:text-indigo-500">
              <FaInstagram size={24} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
