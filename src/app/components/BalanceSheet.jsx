import { formatAmount } from "@/app/lib/formatAmount";
import { FiArrowUp, FiArrowDown, FiActivity } from "react-icons/fi";

export default function BalanceSheet({ income, expense, duration }) {
  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow-md border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-white">Balance Sheet</h2>

        {duration && (
          <div className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
            {duration}
          </div>
        )}
      </div>

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
            <p className="text-white font-bold text-base">
              ₹{formatAmount(income)}
            </p>
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
            <p className="text-red-300 font-bold text-base">
              ₹{formatAmount(expense)}
            </p>
          </div>
        </div>

        {/* Net Balance Card */}
        <div
          className={`col-span-2 bg-gray-800 p-3 rounded-lg border flex items-start ${
            income - expense >= 0 ? "border-green-500/30" : "border-red-500/30"
          }`}
        >
          <div className="mr-3">
            <div
              className={`p-2 rounded-lg ${
                income - expense >= 0 ? "bg-green-900/30" : "bg-red-900/30"
              }`}
            >
              <FiActivity
                size={26}
                className={`text-lg ${
                  income - expense >= 0 ? "text-green-400" : "text-red-400"
                }`}
              />
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Net Balance</p>
            <p
              className={`font-bold text-xl ${
                income - expense >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              ₹{formatAmount(income - expense)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
