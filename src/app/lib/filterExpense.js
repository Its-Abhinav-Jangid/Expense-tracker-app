export default function filterExpense({
  expenseData,
  startDate,
  endDate = new Date(),
}) {
  startDate = new Date(startDate).toISOString().split("T")[0];
  endDate = new Date(endDate).toISOString().split("T")[0];
  let totalExpense = 0;
  const expenses = expenseData.filter(
    (expense) =>
      new Date(expense.date.split("T")[0]) >= new Date(startDate) &&
      new Date(expense.date.split("T")[0]) <= new Date(endDate)
  );
  expenses.forEach((expense) => (totalExpense += expense.amount));

  const filteredExpenseData = {
    total: totalExpense,
    expenses,
  };

  return filteredExpenseData;
}
