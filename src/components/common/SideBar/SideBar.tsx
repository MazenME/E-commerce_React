import { useEffect, memo } from "react";
import { useLocation } from "react-router-dom";
import { Search, SlidersHorizontal, Star, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import getCategories from "@/store/actions/getCategories";

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideBar = memo(({ isOpen, onClose }: SideBarProps) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  
  const { records, loading } = useAppSelector((state) => state.categories);
  const isCategoriesPage = location.pathname.startsWith("/categories");

  useEffect(() => {
    if (records.length === 0 && loading === "idle") {
      dispatch(getCategories());
    }
  }, [dispatch, records.length, loading]);

  return (
    <aside
      className={`
        fixed md:static
        top-0 left-0 bottom-0
        z-50 md:z-auto
        w-64 bg-gray-900 text-gray-100 p-6 space-y-6
        border-r border-gray-800 md:border-none
        transition-transform duration-300 ease-in-out
        shadow-2xl md:shadow-none
        h-screen md:h-auto
        overflow-y-auto md:overflow-visible
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg font-semibold tracking-wide">Filters</h2>
        </div>
        <button
          onClick={onClose}
          className="md:hidden p-1.5 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Search</label>
        <div className="relative">
          <input
            type="text"
            placeholder={isCategoriesPage ? "Search categories..." : "Search products..."}
            className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-xl border border-gray-700 focus:outline-none focus:border-cyan-400 transition-colors placeholder-gray-500 text-sm"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Categories Filter */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Categories</label>
        <select className="w-full bg-gray-800 text-white px-3 py-2 rounded-xl border border-gray-700 focus:outline-none focus:border-cyan-400 transition-colors text-sm cursor-pointer">
          <option value="">All Categories</option>
          {records.map((category) => (
            <option key={category.id} value={category.prefix}>
              {category.title}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Price Range</h3>
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <span className="absolute left-3 top-2 text-xs text-gray-500">$</span>
            <input
              type="number"
              placeholder="Min"
              className="w-full bg-gray-800 text-white pl-7 pr-3 py-1.5 rounded-lg border border-gray-700 focus:outline-none focus:border-cyan-400 text-sm placeholder-gray-600"
            />
          </div>
          <span className="text-gray-500 text-sm">to</span>
          <div className="relative flex-1">
            <span className="absolute left-3 top-2 text-xs text-gray-500">$</span>
            <input
              type="number"
              placeholder="Max"
              className="w-full bg-gray-800 text-white pl-7 pr-3 py-1.5 rounded-lg border border-gray-700 focus:outline-none focus:border-cyan-400 text-sm placeholder-gray-600"
            />
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2].map((stars) => (
            <label key={stars} className="flex items-center gap-3 cursor-pointer group text-sm">
              <input
                type="radio"
                name="rating-filter"
                className="w-4.5 h-4.5 border-gray-700 bg-gray-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-gray-900 cursor-pointer transition-colors"
              />
              <span className="flex items-center gap-1 text-gray-300 group-hover:text-cyan-400 transition-colors">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`w-3.5 h-3.5 ${
                      index < stars ? "text-yellow-400 fill-yellow-400" : "text-gray-600"
                    }`}
                  />
                ))}
                <span className="ml-1 text-xs text-gray-400">& Up</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Sort By Section */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Sort By</label>
        <select className="w-full bg-gray-800 text-white px-3 py-2 rounded-xl border border-gray-700 focus:outline-none focus:border-cyan-400 transition-colors text-sm cursor-pointer">
          <option>Featured</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Top Rated</option>
          <option>Newest</option>
        </select>
      </div>

      {/* Clear Filters Button */}
      <button className="w-full mt-4 py-2.5 px-4 bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white font-medium text-sm rounded-xl transition-all shadow-md shadow-cyan-900/30 cursor-pointer hover:scale-[1.02] active:scale-[0.98]">
        Clear Filters
      </button>
    </aside>
  );
});

export default SideBar;