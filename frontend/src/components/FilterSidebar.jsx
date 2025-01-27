import { useState, useEffect } from "react";
import categories from "../assets/category.json";

const FilterSidebar = ({ onFilterChange }) => {
  const [showMore, setShowMore] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const handleLevelChange = (level) => {
    setSelectedLevels((prev) =>
      prev.includes(level)
        ? prev.filter((item) => item !== level)
        : [...prev, level]
    );
  };

  const handlePriceChange = (price) => {
    setSelectedPrices((prev) =>
      prev.includes(price)
        ? prev.filter((item) => item !== price)
        : [...prev, price]
    );
  };

  const visibleItems = showMore ? categories : categories.slice(0, 4);

  useEffect(() => {
    onFilterChange({
      categories: selectedCategories,
      levels: selectedLevels,
      prices: selectedPrices,
    });
  }, [selectedCategories, selectedLevels, selectedPrices]);

  return (
    <div className="hidden md:block bg-gray-100 w-full max-w-xs rounded-md shadow-lg overflow-hidden">
      <div className="py-4 bg-gray-800 text-white">
        <h2 className="text-2xl font-bold text-center font-sans tracking-wider">
          FILTER
        </h2>
      </div>
      <div className="p-4 flex flex-col gap-4 font-sans">
        <div>
          <h3 className="text-xl font-bold mb-2 text-gray-900">Category</h3>
          <ul className="space-y-2">
            {visibleItems.map((item) => (
              <li key={item.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={item.id}
                  className="mr-2"
                  onChange={() => handleCategoryChange(item.name)}
                />
                <label htmlFor={item.id} className="text-gray-800">
                  {item.name}
                </label>
              </li>
            ))}
          </ul>
          {categories.length > 4 && (
            <button
              className="mt-2 text-indigo-500 hover:text-black transition-colors duration-300 font-bold text-xs"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "SHOW LESS" : "SHOW MORE"}
            </button>
          )}
        </div>
        <hr className="border-gray-300" />
        <div>
          <h3 className="text-xl font-bold mb-2 text-gray-900">Language</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <input
                type="checkbox"
                id="language1"
                defaultChecked
                disabled
                className="mr-2"
              />
              <label htmlFor="language1" className="text-gray-800">
                English
              </label>
            </li>
          </ul>
        </div>
        <hr className="border-gray-300" />
        <div>
          <h3 className="text-xl font-bold mb-2 text-gray-900">Level</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <input
                type="checkbox"
                id="level2"
                className="mr-2"
                onChange={() => handleLevelChange("Beginner")}
              />
              <label htmlFor="level2" className="text-gray-800">
                Beginner
              </label>
            </li>
            <li className="flex items-center">
              <input
                type="checkbox"
                id="level3"
                className="mr-2"
                onChange={() => handleLevelChange("Intermediate")}
              />
              <label htmlFor="level3" className="text-gray-800">
                Intermediate
              </label>
            </li>
            <li className="flex items-center">
              <input
                type="checkbox"
                id="level4"
                className="mr-2"
                onChange={() => handleLevelChange("Advance")}
              />
              <label htmlFor="level4" className="text-gray-800">
                Advance
              </label>
            </li>
            <li className="flex items-center">
              <input
                type="checkbox"
                id="level5"
                className="mr-2"
                onChange={() => handleLevelChange("Expert")}
              />
              <label htmlFor="level5" className="text-gray-800">
                Expert
              </label>
            </li>
          </ul>
        </div>
        <hr className="border-gray-300" />
        <div>
          <h3 className="text-xl font-bold mb-2 text-gray-900">Price</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <input
                type="checkbox"
                id="price1"
                className="mr-2"
                onChange={() => handlePriceChange("Free")}
              />
              <label htmlFor="price1" className="text-gray-800">
                Free
              </label>
            </li>
            <li className="flex items-center">
              <input
                type="checkbox"
                id="price2"
                className="mr-2"
                onChange={() => handlePriceChange("Paid")}
              />
              <label htmlFor="price2" className="text-gray-800">
                Paid
              </label>
            </li>
          </ul>
        </div>
        <hr className="border-gray-300" />
      </div>
    </div>
  );
};

export default FilterSidebar;
