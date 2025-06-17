import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import groupByMonth from "../lib/groupByMonth";
import useLoadingStore from "@/stores/useIsLoadingStore";
import { MonthlyTrendChartSkeleton } from "./MonthlyTrendChartSkeleton";
import { currencyMap } from "../lib/constants/currencies";
import { useUserDataStore } from "@/stores/useUserDataStore";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function MonthlyTrendChart({ incomeData, expenseData }) {
  const isLoading = useLoadingStore((s) => s.isLoading);
  const currencyCode = useUserDataStore((state) => state.user.currencyCode);

  if (isLoading) {
    return <MonthlyTrendChartSkeleton />;
  }
  const groupedData = groupByMonth({ incomeData, expenseData, months: 12 });
  const currencySymbol = currencyMap[currencyCode]?.symbol;

  const labels = Object.keys(groupedData); // e.g., ["Jul 2024", ..., "Jun 2025"]
  const incomeSeries = labels.map((label) => groupedData[label].income);
  const expenseSeries = labels.map((label) => groupedData[label].expense);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Income",
        data: incomeSeries,
        borderColor: "#4ade80",
        backgroundColor: "#4ade80",
        tension: 0.3,
        fill: false,
        pointRadius: 4,
      },
      {
        label: "Expenses",
        data: expenseSeries,
        borderColor: "#f87171",
        backgroundColor: "#f87171",
        tension: 0.3,
        fill: false,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          color: "#d1d5db", // text-gray-300
          callback: (value) => currencySymbol + value,
        },
        grid: {
          color: "#374151", // dark grid
        },
      },
      x: {
        ticks: {
          color: "#d1d5db",
        },
        grid: {
          color: "#1f2937",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#f3f4f6",
          font: { size: 12 },
        },
      },
    },
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-md">
      <h2 className="text-lg font-bold text-white mb-4">
        Monthly Income vs Expenses
      </h2>
      <div className="h-64">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
