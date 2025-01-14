import { LuLayoutDashboard, LuShoppingCart } from "react-icons/lu";
import { useState, useEffect } from "react";
import { IoGlobe } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../store/features/authSlice.js";

const NavbarLarge = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  let timeoutId;
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setDropdownOpen(false);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          <Link to="/">E-Learning</Link>
        </div>
        <div className="flex-1 mx-10">
          <input
            type="text"
            placeholder="Search"
            className="w-full py-2 px-4 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              {user?.role === "instructor" && (
                <Link
                  to={`/admin/dashboard`}
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-500  hover:bg-indigo-600 text-white font-semibold transition-all duration-300"
                >
                  <LuLayoutDashboard className="text-white" size={20} />
                  <span>Dashboard</span>
                </Link>
              )}
              <Link
                to={`/${user?.name}/my-learning`}
                className="cursor-pointer hover:text-blue-500"
              >
                My Learning
              </Link>
              <Link to="/cart" className="cursor-pointer hover:text-blue-500">
                <LuShoppingCart size={24} />
              </Link>
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src="https://via.placeholder.com/40"
                  alt="Profile"
                  className="w-10 h-10 rounded-md cursor-pointer"
                />
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-md shadow-lg z-20">
                    <div
                      className="py-2"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      {user?.role === "instructor" && (
                        <Link
                          to={`/admin/dashboard`}
                          className="block px-4 py-2 hover:bg-gray-700"
                        >
                          Dashboard
                        </Link>
                      )}
                      <Link
                        to={`/${user?.name}/my-learning`}
                        className="block px-4 py-2 hover:bg-gray-700"
                      >
                        My Learning
                      </Link>
                      <Link
                        to="/cart"
                        className="block px-4 py-2 hover:bg-gray-700"
                      >
                        Cart
                      </Link>
                      <Link
                        to={`/${user?.name}/orders`}
                        className="block px-4 py-2 hover:bg-gray-700"
                      >
                        Orders
                      </Link>
                      <Link
                        to={`/${user?.name}/profile`}
                        className="block px-4 py-2 hover:bg-gray-700"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/logout"
                        className="block px-4 py-2 hover:bg-gray-700"
                        onClick={handleLogout}
                      >
                        Logout
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                to="/auth"
                className="bg-gray-700 hover:bg-indigo-500 text-white p-2 rounded-md transition-all duration-500 font-semibold"
              >
                Sign In
              </Link>

              <button className="bg-gray-700 hover:bg-indigo-500 text-white p-2 rounded-md transition-all duration-500">
                <IoGlobe size={24} />
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarLarge;
