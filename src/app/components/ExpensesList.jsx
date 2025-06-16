import useLoadingStore from "@/stores/useIsLoadingStore";
import { ExpenseItem } from "./ExpenseItem";
import TransactionsListSkeleton from "./TransactionsListSkeleton";
export const ExpensesList = ({ expenses }) => {
  const isLoading = useLoadingStore((s) => s.isLoading);
  return (
    <div className="space-y-4 h-48">
      {isLoading ? (
        <TransactionsListSkeleton />
      ) : (
        expenses.map((expense) => <ExpenseItem {...expense} key={expense.id} />)
      )}
    </div>
  );
};
