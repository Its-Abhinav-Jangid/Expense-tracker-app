import { useEffect, useRef, useState } from "react";
import { formatAmount } from "@/app/lib/formatAmount";
import {
  FiArrowUp,
  FiArrowDown,
  FiActivity,
  FiChevronDown,
} from "react-icons/fi";
import filterExpense from "../lib/filterExpense";
import filterIncome from "../lib/filterIncome";
import useLoadingStore from "@/stores/useIsLoadingStore";

export default function BalanceSheet({
  incomeData,
  expenseData,
  duration: initialDuration,
}) {
  const isLoading = useLoadingStore((s) => s.isLoading);
  const [showDropdown, setShowDropdown] = useState(false);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [duration, setDuration] = useState(initialDuration);
  const dropDownRef = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [showDropdown]);

  useEffect(() => {
    handleDurationSelect(duration);
  }, [duration, incomeData, expenseData]);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  function handleDurationSelect(option) {
    setDuration(option);
    if (option === "This Month") {
      const filteredExpenses = filterExpense({
        expenseData: expenseData,
        startDate: new Date().setDate(1),
        endDate: new Date(),
      });
      const filteredIncome = filterIncome({
        incomeData,
        startDate: new Date().setDate(1),
        endDate: new Date(),
      });

      setIncome(filteredIncome.total);
      setExpense(filteredExpenses.total);
    } else if (option === "Last 6 Months") {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setMonth(endDate.getMonth() - 5);
      startDate.setDate(1); // Start at the beginning of the month
      const filteredExpenses = filterExpense({
        expenseData: expenseData,
        startDate,
        endDate,
      });
      const filteredIncome = filterIncome({
        incomeData,
        startDate,
        endDate,
      });
      setIncome(filteredIncome.total);
      setExpense(filteredExpenses.total);
    } else if (option === "Last 1 Year") {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setMonth(endDate.getMonth() - 11);
      startDate.setDate(1); // Start at the beginning of the month
      const filteredExpenses = filterExpense({
        expenseData: expenseData,
        startDate,
        endDate,
      });
      const filteredIncome = filterIncome({
        incomeData,
        startDate,
        endDate,
      });
      setIncome(filteredIncome.total);
      setExpense(filteredExpenses.total);
    }
    setShowDropdown(false);
  }

  const durationOptions = ["This Month", "Last 6 Months", "Last 1 Year"];

  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow-md border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-white">Balance Sheet</h2>

        {initialDuration && (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full hover:bg-gray-600 transition-colors"
            >
              {duration}
              <FiChevronDown className="ml-1" />
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div
                ref={dropDownRef}
                className="absolute right-0 mt-2 w-48 z-10"
              >
                <div className="bg-gray-800 rounded-md shadow-lg border border-gray-700 overflow-hidden">
                  {durationOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleDurationSelect(option)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ... rest of your existing JSX (income/expense cards) */}
      <div className="grid grid-cols-2 gap-3">
        {/* Income Card */}
        <div className="bg-gray-800 p-3 rounded-lg border border-gray-700 flex items-start">
          <div className="mr-3">
            <div className="bg-green-900/30 p-2 rounded-lg">
              <FiArrowUp size={24} className="text-green-400 text-lg" />
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Income</p>
            <div className="text-white font-bold text-base">
              {isLoading ? (
                <div className="mt-2 h-4 bg-gray-700 animate-pulse rounded-full w-16" />
              ) : (
                `₹${formatAmount(income)}`
              )}
            </div>
          </div>
        </div>

        {/* Expenses Card */}
        <div className="bg-gray-800 p-3 rounded-lg border border-gray-700 flex items-start">
          <div className="mr-3">
            <div className="bg-red-900/30 p-2 rounded-lg">
              <FiArrowDown size={24} className="text-red-400 text-lg" />
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Expenses</p>
            <div className="text-red-300 font-bold text-base">
              {isLoading ? (
                <div className="mt-2 h-4 bg-gray-700 animate-pulse rounded-full w-16" />
              ) : (
                `₹${formatAmount(expense)}`
              )}
            </div>
          </div>
        </div>

        {/* Net Balance Card */}
        <div
          className={`col-span-2 bg-gray-800 p-3 rounded-lg border flex items-start ${
            isLoading
              ? "border-green-500/30"
              : income - expense >= 0
              ? "border-green-500/30"
              : "border-red-500/30"
          }`}
        >
          <div className="mr-3">
            <div
              className={`p-2 rounded-lg ${
                isLoading
                  ? "bg-green-900/30"
                  : income - expense >= 0
                  ? "bg-green-900/30"
                  : "bg-red-900/30"
              }`}
            >
              <FiActivity
                size={26}
                className={`text-lg ${
                  isLoading
                    ? "text-green-400"
                    : income - expense >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              />
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Net Balance</p>
            <div
              className={`font-bold text-xl ${
                isLoading
                  ? "text-green-400"
                  : income - expense >= 0
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {isLoading ? (
                <div className="mt-2 h-4 bg-gray-700 animate-pulse rounded-full w-16" />
              ) : (
                `₹${formatAmount(income - expense)}`
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
