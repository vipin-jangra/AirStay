import React from "react";

interface ImageSkeletonProps {
  className?: string;
}

const Skeleton: React.FC<ImageSkeletonProps> = ({ className }) => {
  return (
    <div
      className={`bg-gray-200 animate-pulse rounded-lg ${className}`}
    />
  );
};

export default React.memo(Skeleton);
