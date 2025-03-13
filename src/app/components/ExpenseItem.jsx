import { formatAmount } from "../lib/formatAmount";
export const ExpenseItem = ({ expenseData }) => {
  if (expenseData.created_at) {
    const date = new Date(expenseData.created_at);
    expenseData.date = date.toLocaleDateString();
  }
  return (
    <div className="flex justify-between items-center bg-gray-800 rounded-lg p-3">
      <div>
        <h3 className="font-medium">
          {expenseData.title || expenseData.category || "Expense"}
        </h3>
        <p className="text-xs text-gray-300">{expenseData.date || ""}</p>
      </div>
      <div className="text-red-300 font-bold">
        - ₹{formatAmount(expenseData.amount)}
      </div>
    </div>
  );
};
