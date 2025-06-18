"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import useLoadingStore from "@/stores/useIsLoadingStore";
import { ExpenseChartSkeleton } from "./ExpenseChartSkeleton";
import { currencyMap } from "../lib/constants/currencies";
import { useUserDataStore } from "@/stores/useUserDataStore";
import { days } from "../lib/days";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.register(ArcElement, Tooltip, Legend);
const ExpenseChart = () => {
  const isLoading = useLoadingStore((state) => state.isLoading);
  const currencyCode = useUserDataStore((s) => s.user.currencyCode);
  const expensesSummary = useUserDataStore((state) => state.expensesSummary);

  if (isLoading) {
    return <ExpenseChartSkeleton />;
  }
  const currencySymbol = currencyMap[currencyCode]?.symbol;

  const last7DaysData = expensesSummary.dailyExpenseData.slice(
    expensesSummary.dailyExpenseData.length - 7 > 0
      ? expensesSummary.dailyExpenseData.length - 7
      : 0, // its to prevent from indicies going -ve if data available is less than of 7 days
    expensesSummary.dailyExpenseData.length
  );

  const last7DaysName = last7DaysData.map(
    (expense) => days[new Date(expense.day.split("T")[0]).getDay()]
  );
  const last7DaysDataChart = last7DaysData.map((data) => data.total);

  const chartData = {
    labels: last7DaysName,
    datasets: [
      {
        label: `Expenses ${currencySymbol ? `(${currencySymbol})` : ""}`,
        data: last7DaysDataChart,
        borderColor: "rgba(185, 28, 28, 1)", // red-700
        backgroundColor: "rgba(220, 38, 38, 0.7)", // red-600
        borderWidth: 1,
      },
    ],
  };
  const options = {
    plugins: {
      title: {
        color: "#f3f4f6", // gray-100
      },
      legend: {
        labels: {
          color: "#f3f4f6", // gray-100
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: "#e5e7eb",
          callback: (value) => currencySymbol + value,
        },
      },
    },
  };

  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow-md">
      <Bar data={chartData} options={options} style={{ maxHeight: "15rem" }} />
    </div>
  );
};
export default ExpenseChart;
