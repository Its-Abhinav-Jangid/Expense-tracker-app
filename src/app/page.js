import { Header } from "./components/Header";
import { ExpensesList } from "./components/ExpensesList";
import { ExpenseChart } from "./components/ExpenseChart";
import { ExpenseSummary } from "./components/ExpenseSummary";
import { days } from "./lib/days";
import { AddExpenseButton } from "./components/AddExpenseButton";

import axios from "axios";
import { getCookie } from "./lib/getCookie";

async function fetchExpenseData() {
  const baseURL = process.env.API_BASE_URL;
  const sessionCookie = await getCookie(process.env.AUTH_COOKIE_NAME); // required for api authentication

  const today = new Date();
  const prevMonth = new Date();

  prevMonth.setMonth(today.getMonth() - 1);

  const {
    data: [prev30DaysExpensesSummary],
  } = await axios.get(
    `${baseURL}/api/expenses/summary?startDate=${prevMonth}&endDate=${today}&includeDailyData=true`,
    {
      headers: {
        Cookie: `${sessionCookie.name}=${sessionCookie.value}`, // Important for authentication
      },
    }
  );

  const { data: prev30DaysExpenses } = await axios.get(
    `${baseURL}/api/expenses?startDate=${prevMonth}&endDate=${today}`,
    {
      headers: {
        Cookie: `${sessionCookie.name}=${sessionCookie.value}`,
      },
    }
  );

  return { prev30DaysExpenses, prev30DaysExpensesSummary };
}

export default async function Page() {
  const { prev30DaysExpenses, prev30DaysExpensesSummary } =
    await fetchExpenseData();

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
        {/* Recent Expenses Summary */}
        <ExpenseSummary expenses={prev30DaysExpensesSummary}>
          <ExpensesList expenses={prev30DaysExpenses} />
        </ExpenseSummary>
        {/* Add Expense Button */}
        <AddExpenseButton />
      </div>
    </div>
  );
}
