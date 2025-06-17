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

  const headers = {
    headers: {
      Cookie: `${sessionCookie.name}=${sessionCookie.value}`,
    },
  };

  // Parallelize the requests
  const [expensesRes, incomeRes] = await Promise.all([
    axios.get(
      `${baseURL}/api/expenses?startDate=${prevYear}&endDate=${tomorrow}`,
      headers
    ),
    axios.get(`${baseURL}/api/income`, headers),
  ]);

  return {
    expenses: expensesRes.data,
    income: incomeRes.data,
  };
}
