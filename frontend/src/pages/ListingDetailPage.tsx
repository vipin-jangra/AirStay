import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchListingById } from "../api/listings";
import type { Listing } from "../types/listing";
import { Users, BedDouble, Tag, Share, Heart } from "lucide-react";
import HostDetails from "../components/Host";
import Amenities from "../components/ui/Amenities";
import Skeleton from "../components/ui/skeleton/Skeleton";
import ImageCarousel from "../components/ui/ImageCarousel";

const ListingDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setLoading(true);
        const res = await fetchListingById(id);
        setListing(res.data);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="max-w-[1200px] flex flex-col gap-6 mx-auto px-4 py-6">
      {/* Title */}
      {loading ? (
        <Skeleton className="h-8 w-1/2 rounded-md" />
      ) : (
        <div className="flex w-full justify-between items-center">
            <h1 className="text-2xl font-bold">{listing?.title}</h1>
            <div className="flex items-center gap-3">
                <span className="flex gap-1 items-center"> <Share size={18} strokeWidth={1}/> Share</span>
                <span className="flex gap-1 items-center"> <Heart size={18} strokeWidth={1}/> Save</span>

            </div>
        </div>
      )}

      {/* Image Grid */}
      <div className="hidden lg:block">
        {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 h-[350px] gap-2 rounded-xl overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton
              key={i}
              className={`w-full h-full ${i === 0 ? "col-span-2 row-span-2" : ""}`}
            />
          ))}
        </div>
      ) : (
        listing?.images &&
        listing.images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 h-[350px] gap-2 rounded-xl overflow-hidden">
            {listing.images.slice(0, 5).map((img, i) => (
              <img
                key={i}
                src={img}
                alt={listing.title}
                className={`object-cover w-full h-full ${
                  i === 0 ? "col-span-2 row-span-2" : ""
                }`}
              />
            ))}
          </div>
        )
      )}
      </div>

      {/* Mobile Carousel */}
      {!loading && listing?.images && listing.images.length > 0 && (
        <div className="lg:hidden">
          <ImageCarousel images={listing.images} height="h-64" alt={listing.title} />
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="md:col-span-2 flex flex-col gap-8">
          {loading ? (
            <div className="flex flex-col gap-3">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ) : (
            <div className="flex flex-col">
              <p className="text-black text-2xl font-bold">
                Entire rental unit in {listing?.city}
              </p>
              <div className="flex flex-wrap gap-4 text-gray-700">
                <span className="flex items-center gap-1">
                  <Users size={16} /> {listing?.guests} guests
                </span>
                <span className="flex items-center gap-1">
                  <BedDouble size={16} /> {listing?.beds} beds
                </span>
              </div>
            </div>
          )}

          {loading ? (
            <Skeleton className="h-20 w-full rounded-md" />
          ) : (
            <HostDetails />
          )}

          <hr className="border-1 border-gray-200" />

          {loading ? (
            <Skeleton className="h-32 w-full rounded-md" />
          ) : (
            <Amenities />
          )}

          <hr className="border-1 border-gray-200" />

          {/* Map */}
          {loading ? (
            <Skeleton className="h-64 w-full rounded-lg" />
          ) : (
            listing?.location && (
              <div className="w-full flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <span className="flex text-black text-xl font-semibold">
                    Where you will be
                  </span>
                  <span className="text-gray-500">{listing.address}</span>
                </div>
                <div className="h-64 w-full rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    src={`https://maps.google.com/maps?q=${listing.location.lat},${listing.location.lng}&hl=es;z=15&output=embed`}
                  ></iframe>
                </div>
              </div>
            )
          )}
        </div>

        {/* Right Section - Booking Card */}
        <div className="flex flex-col gap-4">
          {loading ? (
            <Skeleton className="h-14 w-full rounded-2xl" />
          ) : (
            <div className="flex items-center justify-center bg-white h-14 rounded-2xl shadow-lg gap-2">
              <Tag size={24} fill="#ff49a1" className="text-white" />
              <span className="font-sans">Prices includes all fees</span>
            </div>
          )}

          <div className="sticky top-20 p-6 rounded-xl shadow-xl h-fit">
            {loading ? (
              <div className="flex flex-col gap-4">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-10 w-full rounded-lg" />
                <Skeleton className="h-6 w-1/2" />
              </div>
            ) : (
              <>
                <p className="flex gap-2 items-center mb-4">
                  <span className="underline font-semibold text-2xl">
                    ₹{listing?.pricePerNight}
                  </span>
                  <span className="text-lg text-gray-700">for 1 night</span>
                </p>

                <div className="border rounded-lg mb-4">
                  <div className="grid grid-cols-2 divide-x">
                    <div className="p-3">
                      <p className="text-xs text-gray-500">CHECK-IN</p>
                      <p className="font-medium">9/20/2025</p>
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-gray-500">CHECKOUT</p>
                      <p className="font-medium">9/25/2025</p>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition">
                  Reserve
                </button>
                <p className="text-sm text-gray-500 mt-2 text-center">
                  You won’t be charged yet
                </p>

                <div className="flex justify-between mt-4 text-gray-700">
                  <span>₹{listing?.pricePerNight} × 5 nights</span>
                  <span>₹{listing?.pricePerNight! * 5}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg mt-2">
                  <span>Total</span>
                  <span>₹{listing?.pricePerNight! * 5}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailPage;
