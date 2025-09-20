import React, { useState, useMemo, useCallback } from "react";
import type { Listing } from "../types/listing";
import { ChevronLeft, ChevronRight, Heart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedListing } from "../store/slice/listingsSlice";

interface ListingCardProps {
  listing: Listing;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const images = useMemo(
    () => (listing.images?.length ? listing.images : ["/placeholder.png"]),
    [listing.images]
  );

  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleClick = () => {
    dispatch(setSelectedListing(listing));
    navigate(`/listing/${listing._id}`);
  };

  return (
    <div onClick={handleClick} className="overflow-hidden hover:cursor-pointer">
      <div className="relative h-48 w-full group overflow-hidden">
        <div
          className="flex rounded-3xl transition-transform duration-500 ease-in-out h-full w-full"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${listing.title} ${i}`}
              loading="lazy"
              className="w-full flex-shrink-0 rounded-3xl object-cover h-48"
            />
          ))}
        </div>

        {/* label and whishlist */}
        <div className="absolute top-4  left-0 px-3  gap-2 w-full flex justify-between items-center">
          <span className="text-xs bg-white px-4 font-semibold py-1 rounded-full">
            Guest favourite
          </span>
          <div>
            <Heart
              size={22}
              className="text-white fill-black/40 hover:fill-black/60"
            />
          </div>
        </div>

        {/* Left button */}
        {images.length > 1 && current > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white text-black rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
          >
            <ChevronLeft size={18} />
          </button>
        )}

        {/* Right button */}
        {images.length > 1 && current < images.length - 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-black rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
          >
            <ChevronRight size={18} />
          </button>
        )}

        {/* Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                  i === current ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-col p-2">
        <div className="flex justify-between">
          <div className="font-semibold text-sm truncate">{listing.title}</div>
          <div className="text-sm flex items-center gap-1 text-center text-gray-600">
            <Star size={12} className="text-gray-800 fill-gray-800" />{" "}
            {listing.rating?.toFixed(1) || "—"}
          </div>
        </div>
        <div className="text-sm text-gray-500">
          {listing.city} • {listing.beds} bed(s)
        </div>
        <div className="text-sm text-gray-500">{listing.guests} guest(s)</div>
        <div className="mt-2 flex text-gray-600 items-center gap-1 text-sm">
          <div className="text-md text-black font-medium underline ">
            ₹{listing.pricePerNight}{" "}
          </div>
          for 1 night
        </div>
      </div>
    </div>
  );
};

export default React.memo(ListingCard);
