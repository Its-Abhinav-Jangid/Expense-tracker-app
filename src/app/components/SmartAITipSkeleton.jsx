import React from "react";

function SmartAITipSkeleton() {
  return (
    <div className="relative max-w-100">
      <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 rounded-2xl p-0.5 shadow-lg transform transition-all duration-300 hover:scale-[1.015] hover:shadow-xl">
        <div className="bg-gray-900 rounded-2xl p-5 relative overflow-hidden">
          {/* Glows */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500 rounded-full filter blur-[80px] opacity-20"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-500 rounded-full filter blur-[80px] opacity-20"></div>

          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-cyan-400 to-purple-500 p-2 rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">
                  Smart AI Insight
                </h3>
                <div className="flex items-center mt-1">
                  <span className="text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-2 py-0.5 rounded-full">
                    PRO FEATURE
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tip Content */}
          <div className="mb-4 animate-pulse">
            <h4 className="font-bold text-cyan-400 flex items-center">
              <div className="h-4 bg-gray-700 rounded-full w-1/3 mb-1" />
            </h4>
            <div className="mt-2 space-y-2 text-gray-200">
              <div className="h-4 bg-gray-700 rounded-full w-[90%]" />
              <div className="h-4 bg-gray-700 rounded-full w-[90%]" />
              <div className="h-4 bg-gray-700 rounded-full w-[70%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SmartAITipSkeleton;
