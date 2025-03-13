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
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.register(ArcElement, Tooltip, Legend);
export const ExpenseChart = ({ data }) => {
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
          callback: (value) => "₹" + value,
        },
      },
    },
  };

  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow-md">
      <Bar data={data} options={options} style={{ maxHeight: "15rem" }} />
    </div>
  );
};
