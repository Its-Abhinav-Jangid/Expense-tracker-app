"use client";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpenseCategoryChart({ data }) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!data || Object.keys(data).length === 0) return;

    const labels = Object.keys(data);
    const amounts = Object.values(data);

    // Generate HSL colors spaced evenly
    const colors = labels.map((_, i) => `hsl(${(i * 137.5) % 360}, 65%, 55%)`);

    setChartData({
      labels,
      datasets: [
        {
          data: amounts,
          backgroundColor: colors,
          borderColor: "#1f2937", // Tailwind slate-800
          borderWidth: 2,
          hoverOffset: 20,
        },
      ],
    });
  }, [data]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "#e0e0e0",
          font: { size: 13, weight: "600" },
          padding: 10,
          boxWidth: 15,
          boxHeight: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.label}: ₹${context.parsed.toLocaleString()}`,
        },
      },
    },
  };

  if (!chartData) {
    return (
      <div className="p-3 bg-gray-800 rounded-md text-gray-400 text-sm font-medium">
        No category data to display.
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-md max-w-100 w-full">
      <h2 className="text-white font-semibold text-lg mb-4">
        Spending by Category
      </h2>
      <div className="relative h-56">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
}
