import React from "react";
import {
  Wifi,
  Car,
  Snowflake,
  Briefcase,
  Tv,
  Refrigerator,
  Utensils,
  Calendar,
  AlertTriangle,
  Ban,
} from "lucide-react";

const amenities = [
  { icon: Utensils, label: "Kitchen", available: true },
  { icon: Briefcase, label: "Dedicated workspace", available: true },
  { icon: Tv, label: "TV", available: true },
  { icon: Refrigerator, label: "Fridge", available: true },
  { icon: AlertTriangle, label: "Carbon monoxide alarm", available: false },
  { icon: Wifi, label: "Wifi", available: true },
  { icon: Car, label: "Free parking on premises", available: true },
  { icon: Snowflake, label: "AC – split-type ductless system", available: true },
  { icon: Calendar, label: "Long-term stays allowed", available: true },
  { icon: Ban, label: "Smoke alarm", available: false },
];

const Amenities: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">What this place offers</h2>

      {/* Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-10">
        {amenities.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <item.icon className="w-6 h-6 text-gray-800" />
            <span
              className={`text-gray-800 text-base ${
                !item.available ? "line-through text-gray-500" : ""
              }`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Show all button */}
      <button className="mt-4 px-4 py-2 rounded-xl border border-gray-300 bg-gray-100 hover:bg-gray-200">
        Show all 21 amenities
      </button>
    </div>
  );
};

export default Amenities;
