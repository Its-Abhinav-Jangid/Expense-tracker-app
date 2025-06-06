"use client";
import React, { useMemo } from "react";
import { useUserDataStore } from "@/stores/useUserDataStore";
import BalanceSheet from "../components/BalanceSheet";
import MonthlyTrendChart from "../components/MonthlyTrendChart";
import SmartAITip from "../components/SmartAITip";
import filterByCategories from "../lib/filterByCategories";
import ExpenseCategoryChart from "../components/ExpenseCategoryChart";

function Stats() {
  const expenses = useUserDataStore((state) => state.expenses);
  const income = useUserDataStore((state) => state.income);

  const filteredExpenses = useMemo(() => {
    return filterByCategories({
      data: expenses,
      startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
    });
  }, [expenses]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col space-y-6">
      <BalanceSheet
        incomeData={income}
        expenseData={expenses}
        duration="Last 6 Months"
      />
      <ExpenseCategoryChart data={filteredExpenses} />
      <SmartAITip incomeData={income} expenseData={expenses} />
      <MonthlyTrendChart incomeData={income} expenseData={expenses} />
    </div>
  );
}

export default Stats;
