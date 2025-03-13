"use client";
import { Header } from "../components/Header";
import { ExpensesList } from "../components/ExpensesList";
import { ExpenseChart } from "../components/ExpenseChart";
import { ExpenseSummary } from "../components/ExpenseSummary";
import { AddExpenseForm } from "../components/AddExpenseForm";
import { days } from "../lib/days";
import Skeleton from "./loadingState";
import { useEffect, useState } from "react";

import axios from "axios";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [monthlyExpenseSummary, setMonthlyExpenseSummary] = useState({
    total: 0,
    highest: 0,
  });
  const [monthExpenseData, setMonthExpenseData] = useState([]);
  const [last7DaysData, setlast7DaysData] = useState([]);
  const [last7DaysName, setLast7DaysName] = useState([]);
  const chartData = {
    labels: last7DaysName,
    datasets: [
      {
        label: "Expenses (₹)",
        data: last7DaysData,
        borderColor: "rgba(185, 28, 28, 1)", // red-700
        backgroundColor: "rgba(220, 38, 38, 0.7)", // red-600
        borderWidth: 1,
      },
    ],
  };
  async function fetchData() {
    setIsLoading(true);
    const today = new Date();
    const prevMonth = new Date();
    prevMonth.setMonth(today.getMonth() - 1);

    const {
      data: [monthlyExpenseSummaryData],
    } = await axios.get(
      `/api/expenses/summary?startDate=${prevMonth}&endDate=${today}&includeDailyData=true`
    );
    setMonthlyExpenseSummary(monthlyExpenseSummaryData);

    const { data: prev30DaysExpenseData } = await axios.get(
      `/api/expenses?startDate=${prevMonth}&endDate=${today}`
    );

    setMonthExpenseData(prev30DaysExpenseData);

    const last7DaysData = monthlyExpenseSummaryData.dailyExpenseData.slice(
      monthlyExpenseSummaryData.dailyExpenseData.length - 7 > 0
        ? monthlyExpenseSummaryData.dailyExpenseData.length - 7
        : 0, // its to prevent from indicies going -ve if data available is less than of 7 days
      monthlyExpenseSummaryData.dailyExpenseData.length
    );
    const last7DaysDataChart = last7DaysData.map((expenses) => expenses.total);
    const last7DaysName = last7DaysData.map(
      (expense) => days[new Date(expense.day.split("T")[0]).getDay()]
    );

    setlast7DaysData(last7DaysDataChart);
    setLast7DaysName(last7DaysName);
    setIsLoading(false);
  }
  useEffect(() => {
    fetchData();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  function closeModal() {
    setIsModalOpen(false);
  }
  return (
    <div>
      <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col space-y-6">
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            <Header />
            {/* Bar Chart Section */}
            <ExpenseChart data={chartData} />
            {/* Recent Expenses Summary */}
            <ExpenseSummary expenses={monthlyExpenseSummary}>
              <ExpensesList expenses={monthExpenseData} />
            </ExpenseSummary>
            {/* Add Expense Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-xl font-bold shadow-lg transition-colors"
            >
              + Add Expense
            </button>
          </>
        )}
      </div>

      {isModalOpen && <AddExpenseForm onClose={closeModal} onAdd={fetchData} />}
    </div>
  );
}
