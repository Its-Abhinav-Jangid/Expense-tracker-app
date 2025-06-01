export default function filterIncomeForCurrentMonth(incomeData) {
  const currentMonthStartDate = new Date(new Date().setDate(1))
    .toISOString()
    .split("T")[0];

  const nonRecurringIncome = incomeData.filter(
    (income) =>
      income.isRecurring === false &&
      new Date(income.date) >= new Date(currentMonthStartDate)
  );
  const recurringIncome = incomeData.filter(
    (income) => income.isRecurring === true
  );

  let totalIncome = 0;
  recurringIncome.map((income) => (totalIncome += income.amount));
  nonRecurringIncome.map((income) => (totalIncome += income.amount));

  const currentMonthIncomeData = {
    recurringIncome,
    nonRecurringIncome,
    total: totalIncome,
  };

  return currentMonthIncomeData;
}
