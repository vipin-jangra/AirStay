import React from "react";

interface ListingCardSkeletonProps {
    className?: string;
}

const ListingCardSkeleton: React.FC = ({className}: ListingCardSkeletonProps) => {
  return (
    <div className={`${className} animate-pulse`}>
      {/* Image */}
      <div className="w-full h-48 bg-gray-200 rounded-lg mb-3"></div>

      {/* Title */}
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>

      {/* Subtitle */}
      <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>

      {/* Price */}
      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
    </div>
  );
};

export default React.memo(ListingCardSkeleton);
