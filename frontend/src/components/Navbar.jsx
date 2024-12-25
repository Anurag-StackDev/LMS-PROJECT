import { useState, useEffect } from "react";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  let timeoutId;

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

  return (
    <nav className="bg-gray-800 text-white">
      <div className="mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent">
          E-Learning
        </div>
        <div className="flex-1 mx-10">
          <input
            type="text"
            placeholder="Search"
            className="w-full py-2 px-4 bg-gray-700 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex items-center gap-6">
          <span className="cursor-pointer hover:text-indigo-500">
            My Learning
          </span>
          <span className="cursor-pointer hover:text-indigo-500">Cart</span>
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer"
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-10">
                <div
                  className="py-2"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <a
                    href="/my-learning"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    My Learning
                  </a>
                  <a href="/cart" className="block px-4 py-2 hover:bg-gray-200">
                    Cart
                  </a>
                  <a
                    href="/orders"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    Orders
                  </a>
                  <a
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    Profile
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
