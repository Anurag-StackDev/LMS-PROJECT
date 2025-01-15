import { LuArchive } from "react-icons/lu";
import { useState, useEffect, useRef } from "react";
import {
  IoGlobe,
  IoMenu,
  IoCloseCircleOutline,
  IoSearch,
} from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../store/features/authSlice.js";

const NavbarSmall = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const menuRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const handleMenuItemClick = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="mx-auto py-4 px-4 sm:px-6 flex justify-between items-center">
        <div className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          <Link to="/">E-Learning</Link>
        </div>
        <div className="flex items-center gap-4">
          <button className="hover:text-blue-500">
            <IoSearch size={24} />
          </button>
          <button className="hover:text-blue-500">
          <Link
              to={`/${user?.name}/orders`}
              className="cursor-pointer"
              onClick={handleMenuItemClick}
            >
              <LuArchive size={24} />
            </Link>
          </button>
          
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
        <div
          ref={menuRef}
          className="absolute top-16 right-0 w-80 h-4/6 bg-gray-800 text-white z-20 rounded-es-lg shadow-lg"
        >
          <div className="px-10 py-4 flex flex-col gap-3 h-full relative">
            {user ? (
              <>
                <Link
                  to={`/${user.name}/profile`}
                  className="hover:text-blue-500 p-2 text-xl font-bold"
                  onClick={handleMenuItemClick}
                >
                  Profile
                </Link>
                <Link
                  to="*"
                  className="hover:text-blue-500 p-2 text-xl font-bold"
                  onClick={handleMenuItemClick}
                >
                  Cart
                </Link>
                <Link
                  to={`/${user.name}/orders`}
                  className="hover:text-blue-500 p-2 text-xl font-bold"
                  onClick={handleMenuItemClick}
                >
                  Orders
                </Link>
                <Link
                  to={`/${user.name}/my-learning`}
                  className="hover:text-blue-500 p-2 text-xl font-bold"
                  onClick={handleMenuItemClick}
                >
                  My Learning
                </Link>
                <Link
                  to="/logout"
                  className="hover:bg-blue-600 p-2 mr-10 font-bold rounded-md text-center bg-blue-500 mt-auto"
                  onClick={(handleMenuItemClick, handleLogout)}
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/auth"
                  className="hover:text-blue-500 px-2 text-lg font-bold mr-10"
                  onClick={handleMenuItemClick}
                >
                  Sign In
                </Link>
              </>
            )}
            <button
              className="absolute bottom-4 right-4 bg-gray-700 hover:bg-blue-600 text-white p-2 rounded-md transition-all duration-500"
              onClick={handleMenuItemClick}
            >
              <IoGlobe size={24} />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarSmall;
