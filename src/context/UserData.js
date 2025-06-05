"use client";
import { createContext, useReducer } from "react";

export const UserDataContext = createContext();

function calculateHighest(expenses) {
  if (expenses.length === 0) return 0;
  return expenses.reduce(
    (max, curr) => Math.max(max, parseInt(curr.amount)),
    0
  );
}

function userReducer(state, action) {
  const newAmount = parseInt(action?.amount);
  const nowISOString = new Date().toISOString();
  let updatedExpenses;
  let updatedIncomeData;
  switch (action.type) {
    case "ADD_EXPENSE":
      return {
        ...state,
        prev30DaysExpenses: [
          {
            id: action.dummyId,
            amount: newAmount,
            category: action.category,
            created_at: action?.created_at || nowISOString,
            isOptimistic: action?.isOptimistic || false,
          },
          ...state.prev30DaysExpenses,
        ],
        prev30DaysExpensesSummary: {
          count: state.prev30DaysExpensesSummary.count + 1,
          highest:
            state.prev30DaysExpensesSummary.highest < newAmount
              ? newAmount
              : state.prev30DaysExpensesSummary.highest,
          total: state.prev30DaysExpensesSummary.total + newAmount,
          dailyExpenseData:
            state.prev30DaysExpensesSummary.dailyExpenseData.map((data) => {
              const isToday =
                data.day.split("T")[0] === nowISOString.split("T")[0];

              if (isToday) {
                return {
                  ...data,
                  total: data.total + newAmount,
                };
              }
              return data; // return unchanged object
            }),
        },
      };

    case "EDIT_EXPENSE":
      const prevData = state.prev30DaysExpenses.find(
        (data) => data.id === action.id || data.id === action.prevId
      );
      if (!prevData) {
        console.warn("Expense not found for editing:", action.id);
        return state;
      }
      const prevAmount = parseInt(prevData.amount);

      updatedExpenses = state.prev30DaysExpenses.map((data) => {
        const isFound = data.id === action.id || data.id === action.prevId;

        if (isFound) {
          return {
            ...data,
            id: action.id,
            amount: newAmount,
            category: action.category,
            created_at: action.created_at,
            user_id: action.user_id,
            isOptimistic: action?.isOptimistic || false,
          };
        }
        return data;
      });
      const newHighest = calculateHighest(updatedExpenses);
      return {
        ...state,

        prev30DaysExpensesSummary: {
          count: state.prev30DaysExpensesSummary.count,
          highest: newHighest,
          total: state.prev30DaysExpensesSummary.total - prevAmount + newAmount,
          dailyExpenseData:
            state.prev30DaysExpensesSummary.dailyExpenseData.map((data) => {
              const isToday =
                data.day.split("T")[0] === prevData.created_at.split("T")[0];

              if (isToday) {
                return {
                  ...data,
                  total: data.total - prevAmount + newAmount,
                };
              }
              return data; // return unchanged object
            }),
        },

        prev30DaysExpenses: updatedExpenses,
      };

    case "DELETE_EXPENSE":
      const deletedExpense = state.prev30DaysExpenses.find(
        (data) => data.id === action.id
      );
      if (!deletedExpense) {
        console.warn("Expense not found for deleting:", action.id);
        return state;
      }
      updatedExpenses = state.prev30DaysExpenses.filter(
        (data) => data.id !== action.id
      );

      return {
        ...state,
        prev30DaysExpensesSummary: {
          count: state.prev30DaysExpensesSummary.count - 1,
          total: state.prev30DaysExpensesSummary.total - deletedExpense.amount,
          highest: calculateHighest(updatedExpenses),
          dailyExpenseData:
            state.prev30DaysExpensesSummary.dailyExpenseData.map((data) => {
              const isToday =
                data.day.split("T")[0] ===
                deletedExpense.created_at.split("T")[0];

              if (isToday) {
                return {
                  ...data,
                  total: data.total - deletedExpense.amount,
                };
              }
              return data; // return unchanged object
            }),
        },
        prev30DaysExpenses: updatedExpenses,
      };

    case "ADD_INCOME":
      updatedIncomeData = [
        {
          id: action.id,
          amount: newAmount,
          category: action.category,
          createdAt: action?.createdAt || nowISOString,
          date: action.date,
          isRecurring: action.isRecurring,
          notes: action.notes,
          isOptimistic: action?.isOptimistic || false,
        },
        ...state.incomeData,
      ];
      return {
        ...state,
        incomeData: updatedIncomeData,
      };

    case "EDIT_INCOME":
      const found = state.incomeData.find(
        (data) => data.id === action.id || data.id === action.prevId
      );
      if (!found) {
        console.warn(
          "Income not found for editing id: ",
          action?.prevId || action?.id
        );
        return state;
      }
      updatedIncomeData = state.incomeData.map((data) => {
        const isFound = data.id === action?.id || data.id === action.prevId;

        if (isFound) {
          return {
            ...data,
            id: action?.id || found.id,
            amount: newAmount || found.amount,
            category: action?.category || found.category,
            createdAt: action?.createdAt || found.createdAt || nowISOString,
            date: action?.date || found.date || nowISOString,
            isRecurring: action?.isRecurring || found.isRecurring,
            notes: action?.notes || found.notes,
            updatedAt: action?.updatedAt || found.updatedAt || nowISOString,
            userId: action.userId,
            isOptimistic: action?.isOptimistic || false,
          };
        }

        return data;
      });
      return {
        ...state,
        incomeData: updatedIncomeData,
      };

    case "ROLLBACK":
      return action.prevState;
  }
}

export default function UserProvider({ children, initialData = {} }) {
  const [userData, dispatch] = useReducer(userReducer, initialData);

  return (
    <UserDataContext.Provider
      value={{ userData: userData, dispatch: dispatch }}
    >
      {children}
    </UserDataContext.Provider>
  );
}
