import { X } from "lucide-react";
import React, { useState, useMemo, useCallback } from "react";
import { Range, getTrackBackground } from "react-range";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setRange } from "../store/slice/priceFilterSlice";

interface PriceFilterProps {
  onClose?: () => void;
}

const PriceFilterComponent: React.FC<PriceFilterProps> = ({ onClose }) => {
  const STEP = 100;
  const MIN = 1000;
  const MAX = 60000;
  const BINS = 40;

  const dispatch = useDispatch();
  const { minPrice, maxPrice } = useSelector(
    (state: RootState) => state.priceFilter
  );

  const [values, setValues] = useState<number[]>([minPrice, maxPrice]);

  // Fake histogram (replace with backend counts)
  const histogram = useMemo(
    () => Array.from({ length: BINS }).map(() => 20 + Math.random() * 80),
    []
  );

  const binWidth = (MAX - MIN) / BINS;

  const handleApply = useCallback(() => {
    dispatch(setRange(values as [number, number]));
    onClose?.();
  }, [dispatch, values, onClose]);

  const handleCancel = useCallback(() => {
    setValues([minPrice, maxPrice]); // reset local to redux values
    onClose?.();
  }, [minPrice, maxPrice, onClose]);

  return (
    <div className="bg-white flex flex-col p-6 gap-2 rounded-2xl shadow-lg w-full max-w-md relative">
      {/* Header */}
      <div className="flex flex-col gap-2 w-full items-center justify-center">
        <div className="text-center w-full relative flex items-center justify-center text-lg font-semibold">
          <span>Filters</span>
          <button
            onClick={onClose}
            className="absolute right-0 rounded-full hover:bg-gray-200 p-1 text-sm text-gray-500 hover:text-gray-700"
          >
            <X size={18} />
          </button>
        </div>
        <hr className="w-full border-1 border-gray-200" />
      </div>

      {/* Title */}
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold">Price range</h2>
        <p className="text-sm text-gray-500 mb-6">
          Trip price, includes all fees
        </p>
      </div>

      {/* Histogram */}
      <div className="h-24 flex items-end gap-[2px] mb-6">
        {histogram.map((height, i) => {
          const binStart = MIN + i * binWidth;
          const binEnd = binStart + binWidth;
          const isActive = binEnd >= values[0] && binStart <= values[1];

          return (
            <div
              key={i}
              className="flex-1 rounded-t"
              style={{
                height: `${height}px`,
                backgroundColor: isActive ? "#ec4899" : "#e5e7eb",
              }}
            />
          );
        })}
      </div>

      {/* Slider */}
      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={setValues}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="h-1 w-full rounded bg-gray-200"
            style={{
              background: getTrackBackground({
                values,
                colors: ["#ddd", "#ec4899", "#ddd"],
                min: MIN,
                max: MAX,
              }),
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            className="w-6 h-6 bg-white border rounded-full shadow-md focus:outline-none"
          />
        )}
      />

      {/* Min / Max Display */}
      <div className="flex justify-between mt-6">
        <div className="text-center">
          <p className="text-sm text-gray-500">Minimum</p>
          <div className="mt-1 px-3 py-2 border rounded-full text-sm font-medium">
            ₹{values[0]}
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">Maximum</p>
          <div className="mt-1 px-3 py-2 border rounded-full text-sm font-medium">
            ₹{values[1]}+
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={handleCancel}
          className="px-4 py-2 rounded-md border hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={handleApply}
          className="px-4 py-2 rounded-md bg-pink-600 text-white hover:bg-pink-700"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

const PriceFilter = React.memo(PriceFilterComponent);
export default PriceFilter;
