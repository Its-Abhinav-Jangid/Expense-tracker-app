export default function filterIncome({
  incomeData,
  startDate,
  endDate = new Date(),
}) {
  // Convert to Date objects and set time components
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);

  const end = new Date(endDate);
  end.setHours(23, 59, 59, 999);

  // Filter non-recurring income within date range
  const nonRecurringIncome = incomeData.filter(
    (income) =>
      income.isRecurring === false &&
      new Date(income.date) >= start &&
      new Date(income.date) <= end
  );

  // Filter all recurring income (date filtering happens later)
  const recurringIncome = incomeData.filter(
    (income) => income.isRecurring === true
  );

  let totalIncome = 0;

  // Sum non-recurring income
  nonRecurringIncome.forEach((income) => {
    totalIncome += income.amount;
  });

  // Calculate recurring income within date range
  recurringIncome.forEach((income) => {
    const firstPayment = new Date(income.date);
    firstPayment.setHours(0, 0, 0, 0);

    // Skip if first payment is after end date
    if (firstPayment > end) return;

    let current = new Date(firstPayment);
    let count = 0;

    // Advance to first valid payment in range
    while (current < start) {
      current.setMonth(current.getMonth() + 1);
      if (current > end) return;
    }

    // Count occurrences within date range
    while (current <= end) {
      count++;
      const next = new Date(current);
      next.setMonth(next.getMonth() + 1);
      current = next;
    }

    totalIncome += income.amount * count;
  });

  return {
    recurringIncome,
    nonRecurringIncome,
    total: totalIncome,
  };
}
