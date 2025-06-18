import React from "react";
import BalanceSheetSkeleton from "../components/BalanceSheetSkeleton";
import { ExpenseCategoryChartSkeleton } from "../components/ExpenseCategoryChartSkeleton";
import SmartAITipSkeleton from "../components/SmartAITipSkeleton";
import { MonthlyTrendChartSkeleton } from "../components/MonthlyTrendChartSkeleton";

function loading() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col space-y-6">
      <BalanceSheetSkeleton />
      <ExpenseCategoryChartSkeleton />
      <SmartAITipSkeleton />
      <MonthlyTrendChartSkeleton />
    </div>
  );
}

export default loading;
