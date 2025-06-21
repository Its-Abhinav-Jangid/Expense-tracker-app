import React from "react";
import { Header } from "@/app/components/Header";
import { ExpenseChartSkeleton } from "@/app/components/ExpenseChartSkeleton";
import BalanceSheetSkeleton from "@/app/components/BalanceSheetSkeleton";
import ExpenseSummarySkeleton from "@/app/components/ExpenseSummarySkeleton";
import TransactionsListSkeleton from "@/app/components/TransactionsListSkeleton";

function loading() {
  return (
    <div>
      <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col space-y-6">
        <Header />
        {/* Bar Chart Section */}
        <ExpenseChartSkeleton />
        <BalanceSheetSkeleton />

        {/* Recent Expenses Summary */}
        <ExpenseSummarySkeleton>
          <TransactionsListSkeleton />
        </ExpenseSummarySkeleton>
      </div>
    </div>
  );
}

export default loading;
