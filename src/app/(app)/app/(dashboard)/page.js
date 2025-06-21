"use client";
import dynamic from "next/dynamic";
import { Header } from "@/app/components/Header";
const ExpensesList = dynamic(() => import("@/app/components/ExpensesList"), {
  loading: () => <TransactionsListSkeleton />,
});

const ExpenseChart = dynamic(() => import("@/app/components/ExpenseChart"), {
  loading: () => <ExpenseChartSkeleton />,
});
const ExpenseSummary = dynamic(
  () => import("@/app/components/ExpenseSummary"),
  {
    loading: () => <ExpenseSummarySkeleton />,
  }
);

const AiChatButton = dynamic(() => import("@/app/components/AiChatButton"), {});
const BalanceSheet = dynamic(() => import("@/app/components/BalanceSheet"), {
  loading: () => <BalanceSheetSkeleton />,
});
import "@/app/globals.css";
import { useUserDataStore } from "@/stores/useUserDataStore";
import { ExpenseChartSkeleton } from "@/app/components/ExpenseChartSkeleton";
import BalanceSheetSkeleton from "@/app/components/BalanceSheetSkeleton";
import TransactionsListSkeleton from "@/app/components/TransactionsListSkeleton";
import ExpenseSummarySkeleton from "@/app/components/ExpenseSummarySkeleton";

export default function Page() {
  const expenses = useUserDataStore((state) => state.expenses);
  const expensesSummary = useUserDataStore((state) => state.expensesSummary);
  const income = useUserDataStore((state) => state.income);

  return (
    <div>
      <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col space-y-6">
        <Header />
        {/* Bar Chart Section */}
        <ExpenseChart />
        <BalanceSheet
          incomeData={income}
          expenseData={expenses}
          duration="This Month"
        ></BalanceSheet>

        {/* Recent Expenses Summary */}
        <ExpenseSummary expenses={expensesSummary}>
          <ExpensesList expenses={expenses} />
        </ExpenseSummary>
        <AiChatButton />
      </div>
    </div>
  );
}
