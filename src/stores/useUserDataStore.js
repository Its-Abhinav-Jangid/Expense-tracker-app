import { create } from "zustand";

// Helper to calculate highest expense
function calculateHighest(expenses) {
  if (expenses.length === 0) return 0;
  return expenses.reduce(
    (max, curr) => Math.max(max, parseInt(curr.amount)),
    0
  );
}
function calculateExpensesSummary(expenses) {
  // Get current date in UTC
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  // Calculate start date (365 days ago in UTC)
  const startDate = new Date(today);
  startDate.setUTCDate(today.getUTCDate() - 365);

  // Set end date to tomorrow (exclusive upper bound)
  const endDate = new Date(today);
  endDate.setUTCDate(today.getUTCDate() + 1);

  // Filter expenses to the last 365 days (inclusive)
  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= startDate && expenseDate < endDate;
  });

  const summary = {
    count: filteredExpenses.length,
    highest: 0, // Will be updated below
    total: 0,
    dailyExpenseData: [],
  };

  const dailyTotalsMap = new Map();

  // Track highest expense properly (handles negative values)
  let highest = -Infinity;

  // Process filtered expenses
  for (const expense of filteredExpenses) {
    const dateStr = expense.date.split("T")[0]; // Directly use UTC date string
    summary.total += expense.amount;

    // Update highest amount
    if (expense.amount > highest) {
      highest = expense.amount;
    }

    // Update daily totals
    dailyTotalsMap.set(
      dateStr,
      (dailyTotalsMap.get(dateStr) || 0) + expense.amount
    );
  }

  // Set highest (0 if no expenses)
  summary.highest = highest === -Infinity ? 0 : highest;

  // Generate daily data for 365 days
  const currentDate = new Date(startDate);
  while (currentDate < endDate) {
    const dateStr = currentDate.toISOString().split("T")[0];
    summary.dailyExpenseData.push({
      day: dateStr,
      total: dailyTotalsMap.get(dateStr) || 0,
    });
    currentDate.setUTCDate(currentDate.getUTCDate() + 1);
  }

  return summary;
}

export const useUserDataStore = create((set, get) => ({
  expenses: [],
  expensesSummary: {
    count: 0,
    highest: 0,
    total: 0,
    dailyExpenseData: [],
  },
  income: [],
  user: {
    currencyCode: null,
  },

  setCurrencyCode: (currencyCode) => {
    const current = get();
    set({ user: { ...current.user, currencyCode: currencyCode } });
  },
  setInitialData: (initialData) => {
    const current = get();
    const updatedExpenses = [...current.expenses, ...initialData.expenses];
    const updatedIncome = [...current.income, ...initialData.income];
    let newTotal = 0;
    for (let expense of updatedExpenses) {
      newTotal += expense.amount;
    }

    set({
      expenses: updatedExpenses,
      expensesSummary: calculateExpensesSummary(updatedExpenses) || {
        count: 0,
        highest: 0,
        total: 0,
        dailyExpenseData: [],
      },
      income: updatedIncome,
      user: initialData.user,
    });
    get().sortExpenses();
    get().sortIncome();
  },

  addExpense: ({ dummyId, amount, category, date, isOptimistic, notes }) => {
    const now = new Date().toISOString();
    const newAmount = parseInt(amount);
    const current = get();

    const newExpense = {
      id: dummyId,
      amount: newAmount,
      category,
      notes,
      date: date || now,
      isOptimistic: isOptimistic || false,
    };

    const updatedExpenses = [newExpense, ...current.expenses];
    const updatedSummary = {
      ...current.expensesSummary,
      count: current.expensesSummary.count + 1,
      highest: Math.max(current.expensesSummary.highest, newAmount),
      total: current.expensesSummary.total + newAmount,
      dailyExpenseData: current.expensesSummary.dailyExpenseData.map((d) => {
        const isToday =
          d.day.split("T")[0] === new Date(date).toISOString().split("T")[0];
        return isToday ? { ...d, total: d.total + newAmount } : d;
      }),
    };

    set({
      expenses: updatedExpenses,
      expensesSummary: updatedSummary,
    });
    get().sortExpenses();
  },

  editExpense: ({
    id,
    prevId,
    amount,
    category,
    date,
    notes,
    user_id,
    isOptimistic,
  }) => {
    const newAmount = parseInt(amount);
    const now = new Date().toISOString();
    const current = get();

    // Find previous data
    const prevData = current.expenses.find(
      (data) => data.id === id || data.id === prevId
    );
    if (!prevData) {
      console.warn("Expense not found for editing:", id);
      return;
    }
    const prevAmount = parseInt(prevData.amount);

    // Update expenses array
    const updatedExpenses = current.expenses.map((data) => {
      const isFound = data.id === id || data.id === prevId;
      if (isFound) {
        return {
          ...data,
          id: id,
          amount: newAmount,
          category,
          date,
          notes,
          user_id: user_id,
          isOptimistic: isOptimistic || false,
        };
      }
      return data;
    });

    // Recalculate highest
    const newHighest = calculateHighest(updatedExpenses);

    // Update summary
    const updatedSummary = {
      count: current.expensesSummary.count,
      highest: newHighest,
      total: current.expensesSummary.total - prevAmount + newAmount,
      dailyExpenseData: current.expensesSummary.dailyExpenseData.map((d) => {
        const isToday = d.day.split("T")[0] === prevData.date.split("T")[0];
        if (isToday) {
          return { ...d, total: d.total - prevAmount + newAmount };
        }
        return d;
      }),
    };

    set({
      expenses: updatedExpenses,
      expensesSummary: updatedSummary,
    });
    get().sortExpenses();
  },

  deleteExpense: (id) => {
    const current = get();
    const deletedExpense = current.expenses.find((data) => data.id === id);
    if (!deletedExpense) {
      console.warn("Expense not found for deleting:", id);
      return;
    }

    const updatedExpenses = current.expenses.filter((data) => data.id !== id);

    const updatedSummary = {
      count: current.expensesSummary.count - 1,
      total: current.expensesSummary.total - deletedExpense.amount,
      highest: calculateHighest(updatedExpenses),
      dailyExpenseData: current.expensesSummary.dailyExpenseData.map((d) => {
        const isToday =
          d.day.split("T")[0] === deletedExpense.date.split("T")[0];
        if (isToday) {
          return { ...d, total: d.total - deletedExpense.amount };
        }
        return d;
      }),
    };

    set({
      expenses: updatedExpenses,
      expensesSummary: updatedSummary,
    });
  },

  addIncome: ({
    id,
    amount,
    category,
    createdAt,
    date,
    isRecurring,
    notes,
    userId,
    isOptimistic,
  }) => {
    const now = new Date().toISOString();
    const newAmount = parseInt(amount);
    const current = get();

    const newIncome = {
      id: id,
      amount: newAmount,
      category: category,
      createdAt: createdAt || now,
      date: date,
      isRecurring: isRecurring,
      notes: notes,
      userId: userId,
      isOptimistic: isOptimistic || false,
    };

    const updatedIncome = [newIncome, ...current.income];

    set({ income: updatedIncome });
    get().sortIncome();
  },

  editIncome: ({
    id,
    prevId,
    amount,
    category,
    createdAt,
    date,
    isRecurring,
    notes,
    updatedAt,
    userId,
    isOptimistic,
  }) => {
    const now = new Date().toISOString();
    const newAmount = parseInt(amount);
    const current = get();

    const found = current.income.find(
      (data) => data.id === id || data.id === prevId
    );
    if (!found) {
      console.warn("Income not found for editing id: ", prevId || id);
      return;
    }

    const updatedIncome = current.income.map((data) => {
      const isFound = data.id === id || data.id === prevId;
      if (isFound) {
        return {
          ...data,
          id: id || found.id,
          amount: newAmount,
          category: category || found.category,
          createdAt: createdAt || found.createdAt || now,
          date: date || found.date || now,
          isRecurring: isRecurring,
          notes: notes,
          updatedAt: updatedAt || found.updatedAt || now,
          userId: userId,
          isOptimistic: isOptimistic || false,
        };
      }
      return data;
    });

    set({ income: updatedIncome });
    get().sortIncome();
  },
  deleteIncome: (id) => {
    const current = get();
    const deletedIncome = current.income.find((data) => data.id === id);
    if (!deletedIncome) {
      console.warn("Income not found for deleting:", id);
      return;
    }

    const updatedIncome = current.income.filter((data) => data.id !== id);

    set({
      income: updatedIncome,
    });
  },
  sortExpenses() {
    set((state) => ({
      expenses: [...state.expenses].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      ),
    }));
  },
  sortIncome() {
    set((state) => ({
      income: [...state.income].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      ),
    }));
  },

  rollback: (prevState) => set(prevState),
}));
