"use client";

export function ExpenseCategoryChartSkeleton() {
  return (
    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-md w-full">
      <h2 className="text-white font-semibold text-lg mb-4">
        <div className="h-6 bg-gray-700 rounded w-40 animate-pulse"></div>
      </h2>

      <div className="relative h-56 flex flex-row items-center justify-center gap-6">
        {/* Doughnut placeholder - circle with shimmer effect */}
        <div
          style={{ width: "200px", height: "200px" }}
          className="relative rounded-[50%] bg-gray-700 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600 to-transparent animate-shimmer -translate-x-full w-1/2"></div>
        </div>

        {/* Legend placeholder */}
        <div className="space-y-2">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex items-center">
              <div className="w-4 h-4 bg-gray-700 rounded mr-2 animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded w-16 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
