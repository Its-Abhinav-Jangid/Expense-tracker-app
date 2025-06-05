import { create } from "zustand";

// Helper to calculate highest expense
function calculateHighest(expenses) {
  if (expenses.length === 0) return 0;
  return expenses.reduce(
    (max, curr) => Math.max(max, parseInt(curr.amount)),
    0
  );
}

export const useUserDataStore = create((set, get) => ({
  expenses: [],
  expensesSummary: {
    count: 0,
    highest: 0,
    total: 0,
    dailyExpenseData: [], // Populate this array when setting initial data
  },
  income: [],

  setInitialData: (initialData) => {
    set({
      expenses: initialData.expenses || [],
      expensesSummary: initialData.expensesSummary || {
        count: 0,
        highest: 0,
        total: 0,
        dailyExpenseData: [],
      },
      income: initialData.income || [],
    });
  },

  addExpense: ({ dummyId, amount, category, created_at, isOptimistic }) => {
    const now = new Date().toISOString();
    const newAmount = parseInt(amount);
    const current = get();

    const newExpense = {
      id: dummyId,
      amount: newAmount,
      category,
      created_at: created_at || now,
      isOptimistic: isOptimistic || false,
    };

    const updatedExpenses = [newExpense, ...current.expenses];
    const updatedSummary = {
      ...current.expensesSummary,
      count: current.expensesSummary.count + 1,
      highest: Math.max(current.expensesSummary.highest, newAmount),
      total: current.expensesSummary.total + newAmount,
      dailyExpenseData: current.expensesSummary.dailyExpenseData.map((d) => {
        const isToday = d.day.split("T")[0] === now.split("T")[0];
        return isToday ? { ...d, total: d.total + newAmount } : d;
      }),
    };

    set({
      expenses: updatedExpenses,
      expensesSummary: updatedSummary,
    });
  },

  editExpense: ({
    id,
    prevId,
    amount,
    category,
    created_at,
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
          category: category,
          created_at: created_at,
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
        const isToday =
          d.day.split("T")[0] === prevData.created_at.split("T")[0];
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
          d.day.split("T")[0] === deletedExpense.created_at.split("T")[0];
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
          amount: newAmount || found.amount,
          category: category || found.category,
          createdAt: createdAt || found.createdAt || now,
          date: date || found.date || now,
          isRecurring: isRecurring || found.isRecurring,
          notes: notes || found.notes,
          updatedAt: updatedAt || found.updatedAt || now,
          userId: userId,
          isOptimistic: isOptimistic || false,
        };
      }
      return data;
    });

    set({ income: updatedIncome });
  },

  rollback: (prevState) => set(prevState),
}));
