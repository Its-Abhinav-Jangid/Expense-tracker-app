import { Header } from "./components/Header";
import { ExpensesList } from "./components/ExpensesList";
import { ExpenseChart } from "./components/ExpenseChart";
import { ExpenseSummary } from "./components/ExpenseSummary";
import { days } from "./lib/days";
import axios from "axios";
import { getCookie } from "./lib/getCookie";
import { AiChatButton } from "./components/AiChatButton";
import BalanceSheet from "./components/BalanceSheet";
import filterIncomeForCurrentMonth from "./lib/filterIncomeForCurrentMonth";
import filterExpenseForCurrentMonth from "./lib/filterExpenseForCurrentMonth";
import "./globals.css";
async function fetchData() {
  const baseURL = process.env.API_BASE_URL;
  const sessionCookie = await getCookie(process.env.AUTH_COOKIE_NAME); // required for api authentication
  if (!sessionCookie) {
    throw new Error("Authentication cookie not found");
  }
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const prevMonth = new Date();

  prevMonth.setMonth(new Date().getMonth() - 1);

  const {
    data: [prev30DaysExpensesSummary],
  } = await axios.get(
    `${baseURL}/api/expenses/summary?startDate=${prevMonth}&endDate=${tomorrow}&includeDailyData=true`,
    {
      headers: {
        Cookie: `${sessionCookie.name}=${sessionCookie.value}`, // Important for authentication
      },
    }
  );
  prev30DaysExpensesSummary.dailyExpenseData.pop(); // remove the data for next day

  const { data: prev30DaysExpenses } = await axios.get(
    `${baseURL}/api/expenses?startDate=${prevMonth}&endDate=${tomorrow}`,
    {
      headers: {
        Cookie: `${sessionCookie.name}=${sessionCookie.value}`,
      },
    }
  );
  const { data: incomeData } = await axios.get(`${baseURL}/api/income`, {
    headers: {
      Cookie: `${sessionCookie.name}=${sessionCookie.value}`,
    },
  });

  return { prev30DaysExpenses, prev30DaysExpensesSummary, incomeData };
}

export default async function Page() {
  const { prev30DaysExpenses, prev30DaysExpensesSummary, incomeData } =
    await fetchData();

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
