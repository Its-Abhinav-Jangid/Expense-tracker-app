"use client";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import { useUserDataStore } from "@/stores/useUserDataStore";
const BalanceSheet = dynamic(() => import("@/app/components/BalanceSheet"), {
  loading: () => <BalanceSheetSkeleton />,
});
const MonthlyTrendChart = dynamic(
  () => import("@/app/components/MonthlyTrendChart"),
  { loading: () => <MonthlyTrendChartSkeleton /> }
);
const SmartAITip = dynamic(() => import("@/app/components/SmartAITip"), {
  loading: () => <SmartAITipSkeleton />,
});
const ExpenseCategoryChart = dynamic(
  () => import("@/app/components/ExpenseCategoryChart"),
  { loading: () => <ExpenseCategoryChartSkeleton /> }
);
import filterByCategories from "@/app/lib/filterByCategories";
import SmartAITipSkeleton from "@/app/components/SmartAITipSkeleton";
import BalanceSheetSkeleton from "@/app/components/BalanceSheetSkeleton";
import { MonthlyTrendChartSkeleton } from "@/app/components/MonthlyTrendChartSkeleton";
import { ExpenseCategoryChartSkeleton } from "@/app/components/ExpenseCategoryChartSkeleton";

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
