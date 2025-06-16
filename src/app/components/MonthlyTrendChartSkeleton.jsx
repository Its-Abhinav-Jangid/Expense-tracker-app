"use client";

export function MonthlyTrendChartSkeleton() {
  return (
    <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-md">
      <h2 className="text-lg font-bold text-white mb-4">
        <div className="h-6 bg-gray-700 rounded w-48 animate-pulse"></div>
      </h2>

      <div className="h-64 relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between py-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-4 bg-gray-700 rounded w-full animate-pulse"
            ></div>
          ))}
        </div>

        {/* Main chart area */}
        <div className="absolute left-8 right-0 top-0 bottom-0">
          {/* Horizontal grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-px bg-gray-700 w-full"></div>
            ))}
          </div>

          {/* Data lines placeholder */}
          <div className="absolute inset-0">
            {/* Income line */}
            <div className="absolute top-1/4 left-0 right-0 h-1 bg-green-500/30 rounded-full animate-pulse"></div>
            {/* Expense line */}
            <div className="absolute top-3/4 left-0 right-0 h-1 bg-red-500/30 rounded-full animate-pulse"></div>
          </div>

          {/* Data points */}
          <div className="absolute bottom-0 left-0 right-0 h-[90%] flex justify-between items-end px-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex flex-col items-center w-4">
                {/* Income point */}
                <div
                  className="w-3 h-3 bg-green-500/30 rounded-full mb-4 animate-pulse"
                  style={{ marginBottom: `${20 + ((i * 10) % 40)}px` }}
                ></div>
                {/* Expense point */}
                <div
                  className="w-3 h-3 bg-red-500/30 rounded-full animate-pulse"
                  style={{ marginBottom: `${10 + ((i * 15) % 30)}px` }}
                ></div>
              </div>
            ))}
          </div>

          {/* X-axis labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-3 bg-gray-700 rounded w-10 animate-pulse"
              ></div>
            ))}
          </div>
        </div>

        {/* Shimmer effect (client only) */}

        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/50 to-transparent animate-shimmer -translate-x-full w-1/3"></div>
      </div>

      {/* Legend */}
      <div className="flex justify-center mt-4 gap-4">
        <div className="flex items-center animate-pulse">
          <div className="w-4 h-4 bg-green-500/30 rounded mr-2"></div>
          <div className="h-3 bg-gray-700 rounded w-16"></div>
        </div>
        <div className="flex items-center animate-pulse">
          <div className="w-4 h-4 bg-red-500/30 rounded mr-2"></div>
          <div className="h-3 bg-gray-700 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
}
