import { FiActivity, FiArrowDown, FiArrowUp } from "react-icons/fi";

function BalanceSheetSkeleton() {
  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow-md border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-white">Balance Sheet</h2>
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
            <div className="text-white font-bold text-base">
              <div className="mt-2 h-4 bg-gray-700 animate-pulse rounded-full w-16" />
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
              <div className="mt-2 h-4 bg-gray-700 animate-pulse rounded-full w-16" />
            </div>
          </div>
        </div>

        {/* Net Balance Card */}
        <div
          className={`col-span-2 bg-gray-800 p-3 rounded-lg border flex items-start border-green-500/30`}
        >
          <div className="mr-3">
            <div className={`p-2 rounded-lg bg-green-900/30`}>
              <FiActivity size={26} className={`text-lg text-green-400`} />
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Net Balance</p>
            <div className={`font-bold text-xl text-green-400`}>
              <div className="mt-2 h-4 bg-gray-700 animate-pulse rounded-full w-16" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BalanceSheetSkeleton;
