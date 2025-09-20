import React from "react";
import { Star, DoorOpen, Fan, Home } from "lucide-react";
import { Card, CardContent } from "./ui/Card";

const HostDetails: React.FC = () => {
  return (
    <div className="flex w-full flex-col gap-6  ">
      {/* Top Section */}
      <Card className="w-full">
        <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start justify-between sm:items-center gap-4 w-full">
            {/* Guest Favourite */}
              <span className=" hidden md:block font-semibold text-lg">Guest favourite</span>
              <span className="hidden md:block w-full max-w-2xs text-md font-semibold text-black">
                One of the most loved homes on AirStay, according to guests
              </span>
            
            {/* Ratings */}
            <div className="flex    items-center justify-between gap-4 mt-2 sm:mt-0">
              <div className="flex flex-col items-center">
                <span className="font-bold text-xl">4.92</span>
                <span className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-black text-black"
                    />
                  ))}
                </span>
              </div>

              <div className="border-l border-gray-300 h-10" />
              {/* Guest Favourite */}
              <div className="flex md:hidden flex-col items-start sm:items-center gap-1 sm:gap-2 text-center sm:text-left">
                <span className="font-semibold text-lg">Guest favourite</span>
                <span className="hidden sm:block text-sm text-gray-600">
                  One of the most loved homes on Airbnb
                </span>
              </div>

              <div className="border-l md:hidden border-gray-300 h-10" />

              <div className="flex flex-col items-center">
                <span className="font-bold text-xl">24</span>
                <span className="text-sm text-gray-600">Reviews</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Host Info */}
      <div className="flex items-center gap-4">
        <img
          src="https://i.pravatar.cc/150?u=a04258114e29026702d"
          alt="Host"
          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-sm sm:text-base">Hosted by Harish</h3>
          <p className="text-xs sm:text-sm text-gray-600">
            Superhost · 11 months hosting
          </p>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex items-start gap-3">
          <DoorOpen className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" strokeWidth={1} />
          <div>
            <p className="font-medium">Self check-in</p>
            <p className="text-sm text-gray-600">
              Check yourself in with the lockbox.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Fan className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" strokeWidth={1} />
          <div>
            <p className="font-medium">Designed for staying cool</p>
            <p className="text-sm text-gray-600">
              Beat the heat with the A/C and ceiling fan.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Home className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" strokeWidth={1} />
          <div>
            <p className="font-medium">Extra spacious</p>
            <p className="text-sm text-gray-600">
              Guests love this home’s spaciousness for a comfortable stay.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostDetails;
