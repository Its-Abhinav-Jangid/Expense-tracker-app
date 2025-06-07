import { ExpenseItem } from "./ExpenseItem";
export const ExpensesList = ({ expenses }) => {
  // console.log(expenses);
  return (
    <div className="space-y-4 h-48">
      {expenses.map((expense) => (
        <ExpenseItem {...expense} key={expense.id} />
      ))}
    </div>
  );
};
