"use client";
import { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  HiOutlineFilter,
  HiOutlineChevronDown,
  HiOutlineTrendingUp,
  HiOutlineTrendingDown,
} from "react-icons/hi";
import getTransactions from "../lib/getTransactions";
import { useUserDataStore } from "@/stores/useUserDataStore";
import IncomeItem from "../components/IncomeItem";
import { ExpenseItem } from "../components/ExpenseItem";

export default function page() {
  const [filter, setFilter] = useState("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const expenses = useUserDataStore((state) => state.expenses);
  const income = useUserDataStore((state) => state.income);
  console.log(income);
  const transactions = getTransactions({ expenses, incomeData: income });

  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter((t) => t.type === filter);

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
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-1 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors"
            >
              <HiOutlineFilter className="text-xl" />
              <span className="capitalize">{filter}</span>
              <HiOutlineChevronDown
                className={`transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-20">
                <button
                  onClick={() => {
                    setFilter("all");
                    setIsDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors"
                >
                  All Transactions
                </button>
                <button
                  onClick={() => {
                    setFilter("income");
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors flex items-center"
                >
                  <HiOutlineTrendingUp className="text-emerald-400 mr-2" />{" "}
                  Income
                </button>
                <button
                  onClick={() => {
                    setFilter("expense");
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors flex items-center"
                >
                  <HiOutlineTrendingDown className="text-rose-400 mr-2" />{" "}
                  Expenses
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Transaction List */}
      <main className="px-4 py-2">
        <div className="grid grid-cols-1 gap-3">
          {filteredTransactions.map((transaction) =>
            transaction.type === "income" ? (
              <IncomeItem key={uuidv4()} {...transaction} />
            ) : (
              <ExpenseItem key={uuidv4()} {...transaction} />
            )
          )}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No transactions found
          </div>
        )}
      </main>
    </div>
  );
}
