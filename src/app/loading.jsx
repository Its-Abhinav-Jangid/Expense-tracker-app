"use client";
export default function Skeleton() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col space-y-6">
      {/* Header Skeleton */}
      <div className="flex flex-col items-center mb-2">
        <div className="h-8 bg-gray-700 rounded-full w-48 mb-2 relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-shine bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
        <div className="h-4 bg-gray-700 rounded-full w-32 relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-shine bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </div>

      {/* Chart Skeleton */}
      <div className="bg-gray-800 rounded-xl p-4 shadow-md aspect-video relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-shine bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Stats Skeleton */}

      {/* Recent Expenses Skeleton */}
      <div className="bg-gray-800 rounded-xl p-4 shadow-md space-y-4 relative overflow-hidden">
        <div className="h-6 bg-gray-700 rounded-full w-32 mb-4" />
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="absolute inset-0 -translate-x-full animate-shine bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="p-4 w-20 rounded-xl space-y-2 relative">
            <div className="h-4 bg-gray-700 rounded-full w-24" />
            <div className="h-8 bg-gray-700 rounded-full w-32" />
          </div>
          <div className="p-4 2-20 rounded-xl space-y-2 relative">
            <div className="h-4 bg-gray-700 rounded-full w-24" />
            <div className="h-8 bg-gray-700 rounded-full w-32" />
          </div>
        </div>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex justify-between items-center bg-gray-800 rounded-lg p-3"
          >
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-gray-700 rounded-full w-1/3" />
              <div className="h-3 bg-gray-700 rounded-full w-1/4" />
            </div>
            <div className="h-4 bg-gray-700 rounded-full w-12" />
          </div>
        ))}
        <div className="absolute inset-0 -translate-x-full animate-shine bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </div>
  );
}
