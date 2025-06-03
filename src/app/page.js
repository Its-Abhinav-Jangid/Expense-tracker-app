"use client";
import { Header } from "./components/Header";
import { ExpensesList } from "./components/ExpensesList";
import { ExpenseChart } from "./components/ExpenseChart";
import { ExpenseSummary } from "./components/ExpenseSummary";
import { days } from "./lib/days";

import { AiChatButton } from "./components/AiChatButton";
import BalanceSheet from "./components/BalanceSheet";
import filterIncomeForCurrentMonth from "./lib/filterIncomeForCurrentMonth";
import filterExpenseForCurrentMonth from "./lib/filterExpenseForCurrentMonth";
import "./globals.css";
import useUserData from "@/hooks/useUserData";

export default function Page() {
  const {
    userData: { prev30DaysExpenses, prev30DaysExpensesSummary, incomeData },
  } = useUserData();

  const last7DaysData = prev30DaysExpensesSummary.dailyExpenseData.slice(
    prev30DaysExpensesSummary.dailyExpenseData.length - 7 > 0
      ? prev30DaysExpensesSummary.dailyExpenseData.length - 7
      : 0, // its to prevent from indicies going -ve if data available is less than of 7 days
    prev30DaysExpensesSummary.dailyExpenseData.length
  );

  const last7DaysName = last7DaysData.map(
    (expense) => days[new Date(expense.day.split("T")[0]).getDay()]
  );
  const last7DaysDataChart = last7DaysData.map((data) => data.total);

  const chartData = {
    labels: last7DaysName,
    datasets: [
      {
        label: "Expenses (₹)",
        data: last7DaysDataChart,
        borderColor: "rgba(185, 28, 28, 1)", // red-700
        backgroundColor: "rgba(220, 38, 38, 0.7)", // red-600
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col space-y-6">
        <Header />
        {/* Bar Chart Section */}
        <ExpenseChart data={chartData} />
        <BalanceSheet
          income={filterIncomeForCurrentMonth(incomeData).total}
          expense={filterExpenseForCurrentMonth(prev30DaysExpenses).total}
          duration="This Month"
        ></BalanceSheet>

        {/* Recent Expenses Summary */}
        <ExpenseSummary expenses={prev30DaysExpensesSummary}>
          <ExpensesList expenses={prev30DaysExpenses} />
        </ExpenseSummary>
        <AiChatButton />
      </div>
    </div>
  );
}
