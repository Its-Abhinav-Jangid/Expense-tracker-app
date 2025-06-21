"use client";
import { useState, useEffect, useTransition, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  HiOutlineFilter,
  HiOutlineChevronDown,
  HiOutlineTrendingUp,
  HiOutlineTrendingDown,
} from "react-icons/hi";
import getTransactions from "@/app/lib/getTransactions";
import { useUserDataStore } from "@/stores/useUserDataStore";
import IncomeItem from "@/app/components/IncomeItem";
import { ExpenseItem } from "@/app/components/ExpenseItem";
import fetchData from "./fetchData";
import { DotPulse } from "ldrs/react";
import "ldrs/react/DotPulse.css";
import useLoadingStore from "@/stores/useIsLoadingStore";
import TransactionsListSkeleton from "@/app/components/TransactionsListSkeleton";
export default function page() {
  const isLoading = useLoadingStore((s) => s.isLoading);
  const expenses = useUserDataStore((state) => state.expenses);
  const income = useUserDataStore((state) => state.income);
  const [filter, setFilter] = useState("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const [allExpenses, setAllExpenses] = useState(expenses);
  const [allIncome, setAllIncome] = useState(income);
  const [isPending, startTransition] = useTransition();
  const [allTransactionsLoaded, setAllTransactionsLoaded] = useState(false);
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isDropdownOpen]);
  useEffect(() => {
    setAllExpenses(expenses);
    setAllTransactionsLoaded(false);
  }, [expenses]);

  useEffect(() => {
    setAllIncome(income);
    setAllTransactionsLoaded(false);
    [];
  }, [income]);

  const transactions = getTransactions({
    expenses: allExpenses,
    incomeData: allIncome,
  });

  async function loadMore() {
    if (transactions.length === 0) return;
    startTransition(async () => {
      const endDate = transactions[transactions.length - 1].date;
      endDate.setMilliseconds(endDate.getMilliseconds() - 5); // Prevent duplicate

      const data = await fetchData({ endDate });
      setAllIncome((prev) => [...prev, ...data.incomeData]);
      setAllExpenses((prev) => [...prev, ...data.expenseData]);
      setAllTransactionsLoaded(data.hasAll);
    });
  }

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
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-20"
              >
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
          {isLoading ? (
            <TransactionsListSkeleton />
          ) : (
            filteredTransactions.map((transaction) =>
              transaction.type === "income" ? (
                <IncomeItem key={uuidv4()} {...transaction} />
              ) : (
                <ExpenseItem key={uuidv4()} {...transaction} />
              )
            )
          )}
        </div>

        {filteredTransactions.length === 0 && !isLoading && (
          <div className="text-center py-12 text-gray-500">
            No transactions found
          </div>
        )}

        {/* Load More Button */}
        {filteredTransactions.length > 0 && !allTransactionsLoaded && (
          <div className="mt-4 flex justify-center" onClick={loadMore}>
            <button
              disabled={isPending}
              className="bg-gray-800 hover:bg-gray-700 px-4 py-2.5 rounded-lg text-sm transition-colors w-full max-w-xs"
            >
              {isPending ? (
                <DotPulse size="43" speed="1.3" color="white" />
              ) : (
                "Load More"
              )}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
