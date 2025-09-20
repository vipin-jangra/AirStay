import React, { memo, useCallback } from "react";
import { Globe, Menu, Search, SlidersHorizontal, X } from "lucide-react";
import PriceFilter from "./PriceFilter";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setSearchText, setFilterOpen } from "../store/slice/filterSlice";
import { useNavigate, useLocation } from "react-router-dom";

const ListingsHeader: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { searchText, isFilterOpen } = useSelector(
    (state: RootState) => state.filters
  );

  const handleSearchChange = useCallback(
  (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setSearchText(value));

    // If not already on "/", redirect there when searching
    if (location.pathname !== "/") {
      navigate("/");
    }
  },
  [dispatch, navigate, location.pathname]
);


  const handleOpenFilter = useCallback(() => {
    dispatch(setFilterOpen(true));
  }, [dispatch]);

  const handleCloseFilter = useCallback(() => {
    dispatch(setFilterOpen(false));
  }, [dispatch]);

  const showFilter = location.pathname === "/";

  return (
    <div className="bg-white sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-[1200px] mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0">
        {/* Logo + Search */}
        <div className="flex w-full md:max-w-lg justify-between items-center">
         
          <div
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 text-pink-500 font-bold text-2xl md:text-3xl cursor-pointer"
          >
            <span>AirStay</span>
          </div>

          
          <div className=" flex md:flex-none ml-0 md:ml-4">
            <div className="flex pr-2 min-w-10 bg-white rounded-full shadow-md overflow-hidden border border-gray-200 w-full">
              <input
                type="text"
                placeholder="Search destinations"
                value={searchText}
                onChange={handleSearchChange}
                className=" px-4 py-2 text-gray-700 bg-transparent placeholder-gray-400 outline-none"
              />
              <div className="flex items-center justify-center ">
                <div className="bg-pink-500 p-2 rounded-full">
                  <Search size={16} className="text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Filter button (desktop only) */}
          {showFilter && (
            <button
              onClick={handleOpenFilter}
              className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-full border border-gray-300 hover:border-gray-800 shadow-sm text-sm hover:bg-gray-100 transition ml-2"
            >
              <SlidersHorizontal size={16} />
              <span>Filters</span>
            </button>
          )}
        </div>

        {/* Right Buttons */}
        <div className="flex gap-2 md:gap-4 mt-2 md:mt-0">
          <button className="px-3 md:px-4 py-2 text-gray-700 hover:text-gray-900 font-medium rounded-full md:rounded-3xl text-sm md:text-base hover:bg-gray-100 transition whitespace-nowrap">
            Become a host
          </button>
          <div className="flex items-center gap-2 justify-center">
            <button className="p-2 md:p-3 text-gray-700 hover:text-gray-900 font-medium rounded-full bg-gray-100 transition">
              <Globe size={16} className="md:text-black" />
            </button>

            <button className="p-2 md:p-3 text-gray-700 hover:text-gray-900 font-medium rounded-full bg-gray-100 transition">
              <Menu size={16} />
            </button>
          </div>
            {/* Mobile Filter button */}
            {showFilter && (
              <div className="md:hidden px-4 pb-2">
                <button
                  onClick={handleOpenFilter}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-full border border-gray-300 hover:border-gray-800 shadow-sm text-sm hover:bg-gray-100 transition"
                >
                  <SlidersHorizontal size={16} />
                  <span>Filters</span>
                </button>
              </div>
            )}
          
        </div>
      </div>

      {/* Popup for Filters */}
      {showFilter && isFilterOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={handleCloseFilter}
        >
          <div
            className="relative max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100"
              onClick={handleCloseFilter}
            >
              <X size={18} />
            </button>
            <PriceFilter onClose={handleCloseFilter} />
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(ListingsHeader);
