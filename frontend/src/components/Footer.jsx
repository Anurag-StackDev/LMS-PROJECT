import { FaFacebookF, FaTwitter, FaInstagram, FaGlobe } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white w-full">
      <div className="mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="text-2xl font-extrabold">
          E-Learning
        </div>
        <div className="flex space-x-6">
          <a href="/about" className="hover:underline">About Us</a>
          <a href="/courses" className="hover:underline">Courses</a>
          <a href="/contact" className="hover:underline">Contact</a>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <FaGlobe className="mr-2" size={24} />
            <span>English</span>
          </div>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="hover:text-indigo-500">
              <FaFacebookF size={24} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-indigo-500">
              <FaTwitter size={24} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-indigo-500">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
