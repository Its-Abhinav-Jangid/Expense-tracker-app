export default function filterExpenseForCurrentMonth(expenseData) {
  const currentMonthStartDate = new Date(new Date().setDate(1))
    .toISOString()
    .split("T")[0];

  let totalExpense = 0;
  const currentMonthExpenses = expenseData.filter(
    (expense) =>
      new Date(expense.created_at.split("T")[0]) >=
      new Date(currentMonthStartDate)
  );
  currentMonthExpenses.map((expense) => (totalExpense += expense.amount));

  const currentMonthExpenseData = {
    total: totalExpense,
  };

  return currentMonthExpenseData;
}
