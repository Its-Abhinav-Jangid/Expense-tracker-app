"use client";
import dynamic from "next/dynamic";
import { Header } from "../components/Header";
const ExpensesList = dynamic(() => import("../components/ExpensesList"), {
  loading: () => <TransactionsListSkeleton />,
});

const ExpenseChart = dynamic(() => import("../components/ExpenseChart"), {
  loading: () => <ExpenseChartSkeleton />,
});
const ExpenseSummary = dynamic(() => import("../components/ExpenseSummary"), {
  loading: () => <ExpenseSummarySkeleton />,
});

const AiChatButton = dynamic(() => import("../components/AiChatButton"), {});
const BalanceSheet = dynamic(() => import("../components/BalanceSheet"), {
  loading: () => <BalanceSheetSkeleton />,
});
import "../globals.css";
import { useUserDataStore } from "@/stores/useUserDataStore";
import { ExpenseChartSkeleton } from "../components/ExpenseChartSkeleton";
import BalanceSheetSkeleton from "../components/BalanceSheetSkeleton";
import TransactionsListSkeleton from "../components/TransactionsListSkeleton";
import ExpenseSummarySkeleton from "../components/ExpenseSummarySkeleton";

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
