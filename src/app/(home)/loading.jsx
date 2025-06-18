import React from "react";
import { Header } from "../components/Header";
import { ExpenseChartSkeleton } from "../components/ExpenseChartSkeleton";
import BalanceSheetSkeleton from "../components/BalanceSheetSkeleton";
import ExpenseSummarySkeleton from "../components/ExpenseSummarySkeleton";
import TransactionsListSkeleton from "../components/TransactionsListSkeleton";

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
