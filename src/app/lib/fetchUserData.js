"use server";
import axios from "axios";
import { getCookie } from "./getCookie";

export default async function fetchUserData() {
  const baseURL = process.env.API_BASE_URL;
  const sessionCookie = await getCookie(process.env.AUTH_COOKIE_NAME);
  if (!sessionCookie) {
    throw new Error("Authentication cookie not found");
  }

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const prevYear = new Date();
  prevYear.setFullYear(new Date().getFullYear() - 1);
  const prevMonth = new Date();
  prevMonth.setMonth(new Date().getMonth() - 1);

  const headers = {
    headers: {
      Cookie: `${sessionCookie.name}=${sessionCookie.value}`,
    },
  };

  // Parallelize the requests
  const [summaryRes, expensesRes, incomeRes, currencyCodeRes] =
    await Promise.all([
      axios.get(
        `${baseURL}/api/expenses/summary?startDate=${prevMonth}&endDate=${tomorrow}&includeDailyData=true`,
        headers
      ),
      axios.get(
        `${baseURL}/api/expenses?startDate=${prevYear}&endDate=${tomorrow}`,
        headers
      ),
      axios.get(`${baseURL}/api/income`, headers),
      axios.get(`${baseURL}/api/user/currency`, headers),
    ]);
  const [prev30DaysExpensesSummary] = summaryRes.data;
  prev30DaysExpensesSummary.dailyExpenseData.pop();

  return {
    expenses: expensesRes.data,
    income: incomeRes.data,
    prev30DaysExpensesSummary,
    user: {
      currencyCode: currencyCodeRes.data.currencyCode,
    },
  };
}
