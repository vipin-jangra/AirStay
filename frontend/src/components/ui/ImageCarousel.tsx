// components/ui/ImageCarousel.tsx
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useMemo, useCallback } from "react";

interface ImageCarouselProps {
  images: string[];
  alt?: string;
  height?: string; // Tailwind height class e.g., 'h-64'
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  alt = "image",
  height = "h-48",
}) => {
  const imgs = useMemo(() => (images.length ? images : ["/placeholder.png"]), [
    images,
  ]);
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % imgs.length);
  }, [imgs.length]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + imgs.length) % imgs.length);
  }, [imgs.length]);

  return (
    <div className={`relative w-full overflow-hidden rounded-xl ${height}`}>
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {imgs.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`${alt} ${i + 1}`}
            className={`w-full flex-shrink-0 h-full object-cover rounded-xl`}
          />
        ))}
      </div>

      {/* Left Arrow */}
      {imgs.length > 1 && current > 0 && (
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 opacity-70 hover:opacity-100 transition"
        >
          <ChevronLeft size={18} />
        </button>
      )}

      {/* Right Arrow */}
      {imgs.length > 1 && current < imgs.length - 1 && (
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 opacity-70 hover:opacity-100 transition"
        >
          <ChevronRight size={18} />
        </button>
      )}

      {/* Dots */}
      {imgs.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
          {imgs.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === current ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
