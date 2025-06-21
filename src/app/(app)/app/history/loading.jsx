"use client";

import { HiOutlineFilter, HiOutlineChevronDown } from "react-icons/hi";

import "ldrs/react/DotPulse.css";

import TransactionsListSkeleton from "@/app/components/TransactionsListSkeleton";
export default function page() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-gray-900 border-b border-gray-800">
        <div className="px-4 py-5 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-500 bg-clip-text text-transparent">
            Transaction History
          </h1>

          {/* Filter Dropdown */}
          <div className="relative">
            <button className="flex items-center space-x-1 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors">
              <HiOutlineFilter className="text-xl" />
              <span className="capitalize">All</span>
              <HiOutlineChevronDown className={`transition-transform`} />
            </button>
          </div>
        </div>
      </header>

      {/* Transaction List */}
      <main className="px-4 py-2">
        <div className="grid grid-cols-1 gap-3">
          <TransactionsListSkeleton />
        </div>
      </main>
    </div>
  );
}
