import React from "react";
import { Star, DoorOpen, Fan, Home, Sprout } from "lucide-react";
import { Card, CardContent } from "./ui/Card";

const HostDetails: React.FC = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      {/* Top Section */}
      <Card className="flex w-full items-center justify-between flex-wrap gap-2">
        <CardContent className="flex w-full items-center  gap-2 text-sm">
          <div className="flex w-full justify-between gap-4">
            <div className="flex items-center gap-2">
                
                <span className="font-semibold text-lg  text-md text-center">
                Guest <br />
                favourite
                </span>
                

            </div>
            <span className="font-semibold text-center text-lg items-center justify-center w-full">
              One of the most loved homes on <br />
              Airbnb, according to guests
            </span>
            <div className="flex  items-center gap-3">
              <div className="flex flex-col px-2 items-center justify-center">
                <span className="font-bold text-xl">4.92</span>
                <span className="flex">
                    {
                        Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-black text-black" />
                        ))
                    }
                    
                </span>
              </div>
              <div className="border-1 border-gray-200 h-full">

              </div>
              <div className="flex px-2 flex-col items-center justify-center">
                <span className="font-bold text-xl">24</span>
                <span>Reviews</span>


              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Host Info */}
      <div className="flex items-center gap-4 mt-6">
        <img
          src="https://i.pravatar.cc/150?u=a04258114e29026702d"
          alt="Host"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold">Hosted by Harish</h3>
          <p className="text-sm text-gray-600">Superhost · 11 months hosting</p>
        </div>
      </div>

      <hr className="border-1 border-gray-200" />

      {/* Highlights */}
      <div className="space-y-6">
        <div className="flex  items-start gap-3">
          <div className="w-12 flex items-center justify-center">
            <DoorOpen className="w-6 h-6" strokeWidth={1} />
          </div>
          <div>
            <p className="">Self check-in</p>
            <p className="text-sm text-gray-600">
              Check yourself in with the lockbox.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-12 flex items-center justify-center">
            <Fan className="w-6 h-6" strokeWidth={1} />
          </div>
          <div>
            <p className="">Designed for staying cool</p>
            <p className="text-sm text-gray-600">
              Beat the heat with the A/C and ceiling fan.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-12 flex items-center justify-center">
            <Home className="w-6 h-6" strokeWidth={1} />
          </div>
          <div>
            <p className="">Extra spacious</p>
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
