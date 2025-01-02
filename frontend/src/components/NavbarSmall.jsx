import { LuShoppingCart } from "react-icons/lu";
import { useState } from "react";
import {
  IoGlobe,
  IoMenu,
  IoCloseCircleOutline,
  IoSearch,
} from "react-icons/io5";
import { Link } from "react-router-dom";

const NavbarSmall = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = true;

  return (
    <nav className="bg-gray-800 text-white">
      <div className="mx-auto py-4 px-4 sm:px-6 flex justify-between items-center">
        <div className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent">
          E-Learning
        </div>
        <div className="flex items-center gap-4">
          <button className="hover:text-indigo-500">
            <IoSearch size={24} />
          </button>
          <span className="cursor-pointer hover:text-indigo-500">
            <LuShoppingCart size={24} />
          </span>
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <IoCloseCircleOutline size={28} />
            ) : (
              <IoMenu size={28} />
            )}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="absolute top-16 right-0 w-80 h-4/5 bg-gray-800 text-white z-20 rounded-es-lg">
          <div className="p-4 flex flex-col gap-4 h-full">
            <Link
              to="/profile"
              className="hover:text-indigo-500 p-2 text-xl font-bold"
            >
              Profile
            </Link>
            <Link
              to="/cart"
              className="hover:text-indigo-500 p-2 text-xl font-bold"
            >
              Cart
            </Link>
            <Link
              to="/orders"
              className="hover:text-indigo-500 p-2 text-xl font-bold"
            >
              Orders
            </Link>
            <Link
              to="/my-learning"
              className="hover:text-indigo-500 p-2 text-xl font-bold"
            >
              My Learning
            </Link>
            {!user && (
              <>
                <Link
                  to="/login"
                  className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-3 rounded-md"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-3 rounded-md"
                >
                  Register
                </Link>
                <button className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-md">
                  <IoGlobe size={24} />
                </button>
              </>
            )}
            <Link
              to="/logout"
              className="hover:bg-indigo-600 p-2 text-xl font-bold rounded-md text-center bg-indigo-500 mt-auto"
            >
              <button>Logout</button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarSmall;
