"use server";

import axios from "axios";
import { getCookie } from "../../../lib/getCookie";

export default async function fetchData({ endDate = new Date(), limit = 500 }) {
  const sessionCookie = await getCookie(process.env.AUTH_COOKIE_NAME);
  if (!sessionCookie) {
    throw new Error("Authentication cookie not found");
  }
  const headers = {
    headers: {
      Cookie: `${sessionCookie.name}=${sessionCookie.value}`,
    },
  };
  endDate = new Date(endDate);
  try {
    const { data: expenseData } = await axios.get(
      `${process.env.API_BASE_URL}/api/expenses`,
      {
        params: {
          endDate: endDate,
          limit: limit,
        },
        ...headers,
      }
    );
    const { data: incomeData } = await axios.get(
      `${process.env.API_BASE_URL}/api/income`,
      {
        params: {
          endDate: endDate,
          limit: limit,
        },
        ...headers,
      }
    );
    return {
      expenseData: expenseData || [],
      incomeData: incomeData || [],
      hasAll: expenseData.length < limit && incomeData.length < limit,
    };
  } catch (error) {
    console.error(error);
    return { error: true, message: error.message };
  }
}
