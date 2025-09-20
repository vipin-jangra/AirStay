import React, { useEffect, useCallback, useState } from "react";
import { fetchListings } from "../api/listings";
import ListingCard from "../components/ListingCard";
import Pagination from "../components/Pagination";
import ListingCardSkeleton from "../components/ui/skeleton/ListingSkeleton";
import ListingsMap from "../components/ListingMap";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setHighlightedId, setListings } from "../store/slice/listingsSlice";
import { Map, Tag, TextAlignStart } from "lucide-react";

function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

const ListingsPage: React.FC = () => {
  const dispatch = useDispatch();
  const { searchText } = useSelector((state: RootState) => state.filters);
  const { minPrice, maxPrice } = useSelector(
    (state: RootState) => state.priceFilter
  );
  const { items: listings } = useSelector((state: RootState) => state.listings);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // Mobile toggle: listings overlay
  const [showListings, setShowListings] = useState(false);

  const limit = 9;
  const debouncedSearch = useDebounce(searchText, 500);
  const debouncedMinPrice = useDebounce(minPrice, 500);
  const debouncedMaxPrice = useDebounce(maxPrice, 500);

  useEffect(
    () => setPage(1),
    [debouncedSearch, debouncedMinPrice, debouncedMaxPrice]
  );

  const loadListings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchListings({
        page,
        limit,
        q: debouncedSearch || undefined,
        minPrice: debouncedMinPrice || undefined,
        maxPrice: debouncedMaxPrice || undefined,
      });
      dispatch(setListings(res.data));
      setTotal(res.meta.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [
    page,
    limit,
    debouncedSearch,
    debouncedMinPrice,
    debouncedMaxPrice,
    dispatch,
  ]);

  useEffect(() => {
    loadListings();
  }, [loadListings]);
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="relative w-full h-full">
      {/* Map fixed in background */}
      <div className="fixed lg:hidden top-0 left-0 w-full h-full z-0">
        <ListingsMap />
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex flex-row  py-6 gap-6">
        {/* Listings */}
        <div className="flex flex-col w-[55%] gap-6 ">
          <div className="flex justify-between items-center mb-4">
            <div className="text-gray-800 font-medium">Over {total} homes {debouncedSearch && (
              <span className="text-gray-500">in {debouncedSearch}</span>
            )}</div>
            <div className="flex gap-2 items-center">
              <Tag size={24} fill="#ff49a1" className="text-white" />
              <span className="font-sans">Prices includes all fees</span>

            </div>

          </div>

          {loading ? (
            <div className="grid grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <ListingCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-6">
              {listings?.map((list) => (
                <div
                  key={list._id}
                  onMouseEnter={() => dispatch(setHighlightedId(list._id))}
                  onMouseLeave={() => dispatch(setHighlightedId(null))}
                >
                  <ListingCard listing={list} />
                </div>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center py-6">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          )}
        </div>
        {/* Map */}{" "}
        <div className="lg:block  lg:w-[40%] h-[80vh] right-10 fixed rounded-xl overflow-hidden shadow-md">
          
          <ListingsMap />
        </div>
      </div>

      {/* Mobile Listings Overlay */}
      <div
        className={`fixed bottom-0 left-0 w-full bg-white rounded-t-xl shadow-lg z-20 transition-transform duration-300 lg:hidden
          ${showListings ? "translate-y-0" : "translate-y-[80%]"}`}
        style={{ height: "80%" }}
      >
        <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
          <div className="text-gray-800 font-medium">Over {total} homes</div>
          <button
            className="text-gray-600"
            onClick={() => setShowListings(false)}
          >
            Close
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-48px)]">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <ListingCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {listings?.map((list) => (
                <div
                  key={list._id}
                  onMouseEnter={() => dispatch(setHighlightedId(list._id))}
                  onMouseLeave={() => dispatch(setHighlightedId(null))}
                >
                  <ListingCard listing={list} />
                </div>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center py-4">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Toggle Button */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex lg:hidden shadow-md">
        <button
          className={`px-4 py-2 flex bg-black text-white rounded-2xl text-sm`}
          onClick={() => setShowListings((prev) => !prev)}
        >
          {showListings ? (
            <span className="flex justify-center items-center gap-1"><Map size={16} />Map </span>
          ) : (
            <span className="flex justify-center items-center gap-1"><TextAlignStart size={16} />Lists </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default ListingsPage;
