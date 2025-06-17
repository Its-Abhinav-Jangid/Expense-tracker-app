import useLoadingStore from "@/stores/useIsLoadingStore";
import { formatAmount } from "../lib/formatAmount";
import { useUserDataStore } from "@/stores/useUserDataStore";
import { currencyMap } from "../lib/constants/currencies";
export const ExpenseSummary = (props) => {
  const isLoading = useLoadingStore((s) => s.isLoading);
  const currencyCode = useUserDataStore((s) => s.user.currencyCode);
  const currencySymbol = currencyMap[currencyCode]?.symbol;
  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow-md overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded-xl">
          <p className="text-gray-400 text-sm">Total Spent</p>
          <div className="text-2xl font-bold">
            {isLoading ? (
              <div className="mt-2 animate-pulse h-6 bg-gray-700 rounded-full w-16" />
            ) : (
              `${currencySymbol + formatAmount(props.expenses.total)}`
            )}
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-xl">
          <p className="text-gray-400 text-sm">Largest Expense</p>
          <div className="text-2xl font-bold text-red-300">
            {isLoading ? (
              <div className="mt-2 animate-pulse h-6 bg-gray-700 rounded-full w-16" />
            ) : (
              `${currencySymbol + formatAmount(props.expenses.highest)}`
            )}
          </div>
        </div>
      </div>
      {props.children} {/* for expense list item (if applicable)*/}
    </div>
  );
};
