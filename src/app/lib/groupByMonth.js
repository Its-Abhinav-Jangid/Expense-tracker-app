export default function groupByMonth({ incomeData, expenseData, months = 12 }) {
  const result = {};

  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - months + 1, 1);

  // Initialize months
  for (let i = 0; i < months; i++) {
    const d = new Date(start.getFullYear(), start.getMonth() + i, 1);
    const label = d.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    result[label] = { income: 0, expense: 0 };
  }

  // ➤ Non-recurring income
  incomeData.forEach(({ amount, date, isRecurring }) => {
    if (!isRecurring) {
      const d = new Date(date);
      if (d >= start && d <= now) {
        const label = d.toLocaleString("default", {
          month: "short",
          year: "numeric",
        });
        if (result[label]) result[label].income += amount;
      }
    }
  });

  // ➤ Recurring income: spread across months
  incomeData.forEach(({ amount, date, isRecurring }) => {
    if (!isRecurring) return;

    const startRecurring = new Date(date);
    startRecurring.setHours(0, 0, 0, 0);

    for (let i = 0; i < months; i++) {
      const monthDate = new Date(start.getFullYear(), start.getMonth() + i, 1);
      if (monthDate >= startRecurring && monthDate <= now) {
        const label = monthDate.toLocaleString("default", {
          month: "short",
          year: "numeric",
        });
        if (result[label]) result[label].income += amount;
      }
    }
  });

  // ➤ Expenses
  expenseData.forEach(({ amount, date }) => {
    const d = new Date(date);
    if (d >= start && d <= now) {
      const label = d.toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      if (result[label]) result[label].expense += amount;
    }
  });

  return result;
}
