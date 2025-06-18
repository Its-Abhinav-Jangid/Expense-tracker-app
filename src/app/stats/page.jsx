"use client";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import { useUserDataStore } from "@/stores/useUserDataStore";
const BalanceSheet = dynamic(() => import("../components/BalanceSheet"), {
  loading: () => <BalanceSheetSkeleton />,
});
const MonthlyTrendChart = dynamic(
  () => import("../components/MonthlyTrendChart"),
  { ssr: false, loading: () => <MonthlyTrendChartSkeleton /> }
);
const SmartAITip = dynamic(() => import("../components/SmartAITip"), {
  ssr: false,
  loading: () => <SmartAITipSkeleton />,
});
const ExpenseCategoryChart = dynamic(
  () => import("../components/ExpenseCategoryChart"),
  { ssr: false, loading: () => <ExpenseCategoryChartSkeleton /> }
);
import filterByCategories from "../lib/filterByCategories";
import SmartAITipSkeleton from "../components/SmartAITipSkeleton";
import BalanceSheetSkeleton from "../components/BalanceSheetSkeleton";
import { MonthlyTrendChartSkeleton } from "../components/MonthlyTrendChartSkeleton";
import { ExpenseCategoryChartSkeleton } from "../components/ExpenseCategoryChartSkeleton";

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
