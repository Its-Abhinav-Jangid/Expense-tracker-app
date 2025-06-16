"use client";
import useLoadingStore from "@/stores/useIsLoadingStore";

export const ExpenseChartSkeleton = () => {
  // Fixed heights array (same for server and client)
  const barHeights = [70, 50, 80, 40, 60, 30]; // Same percentages always

  return (
    <div
      style={{ maxHeight: "15rem" }}
      className="bg-gray-800 rounded-xl p-4 shadow-md w-full"
    >
      {/* Chart title skeleton */}
      <div className="mb-4">
        <div className="h-5 bg-gray-700 rounded w-1/3 mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-700 rounded w-1/4 animate-pulse"></div>
      </div>

      {/* Chart container */}
      <div className="relative w-full flex items-end justify-between">
        {/* Bars with fixed heights */}
        {barHeights.map((height, index) => (
          <div
            key={index}
            className="flex flex-col items-center flex-1 mx-0.5 sm:mx-1"
          >
            <div
              className="w-full bg-gray-700 rounded-t relative overflow-hidden"
              style={{ height: height }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600 to-transparent animate-shimmer w-1/2 -translate-x-full"></div>
            </div>
          </div>
        ))}
      </div>

      {/* X-axis labels skeleton */}
      <div className="flex justify-between mt-2">
        {barHeights.map((_, i) => (
          <div
            key={i}
            className="h-3 bg-gray-700 rounded w-1/6 animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  );
};
