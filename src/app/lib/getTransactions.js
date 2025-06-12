export default function getTransactions({ incomeData, expenses }) {
  const transactions = [];
  const now = new Date();

  // Process expenses
  for (let expense of expenses) {
    transactions.push({
      ...expense,
      date: new Date(expense.date),
      type: "expense",
    });
  }

  // Process income
  for (const income of incomeData) {
    const createdDate = new Date(income.date);

    if (income.isRecurring) {
      // Handle recurring income
      const startYear = createdDate.getFullYear();
      const startMonth = createdDate.getMonth();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth();

      const totalMonths =
        (currentYear - startYear) * 12 + (currentMonth - startMonth);

      for (let i = 0; i <= totalMonths; i++) {
        const recurringDate = new Date(createdDate);
        recurringDate.setMonth(startMonth + i);

        // Skip future dates
        if (recurringDate > now) continue;

        transactions.push({
          ...income,
          date: recurringDate,
          type: "income",
          isRecurring: true,
          originalDate: new Date(createdDate),
        });
      }
    } else {
      // Handle one-time income
      transactions.push({
        ...income,
        date: createdDate,
        type: "income",
        isRecurring: false,
      });
    }
  }

  // Sort transactions by date (newest first)
  transactions.sort((a, b) => b.date - a.date);

  return transactions;
}
