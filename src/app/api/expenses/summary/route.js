import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

export async function GET(request) {
  const session = await auth();
  console.log(session);
  if (!session || !session.user || !session.user.id) {
    return new Response(
      JSON.stringify({ msg: "Unauthorized, please login and try again" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const includeDailyData = searchParams.get("includeDailyData");
  const userId = String(session.user.id);
  if (!startDate || !endDate) {
    return new Response(JSON.stringify({ error: "Invalid date range" }), {
      status: 400,
    });
  }

  let start = new Date(startDate);
  let end = new Date(endDate);

  try {
    const summary = await prisma.$queryRaw`
      SELECT 
       
        SUM(amount) AS total,
        MAX(amount) AS highest,
        COUNT(*) AS count
      FROM expenses
      WHERE created_at > ${start} AND created_at < ${end} AND "user_id" = ${userId}

    `;
    let dailyExpenses = [];
    if (Boolean(includeDailyData)) {
      const dailyData = await prisma.$queryRaw`
      SELECT DATE(created_at) AS day, SUM(amount) AS total
      FROM expenses
      WHERE created_at >= ${start} AND created_at <= ${end} AND "user_id" = ${userId}
      GROUP BY DATE(created_at)
      ORDER BY day ASC;
    `;
      const formattedDailyData = dailyData.map((data) => {
        return { day: data.day, total: Number(data.total) };
      });

      let current = new Date(start);

      while (current <= end) {
        // Ensure 'end' is included
        const currentDateString = current.toISOString().split("T")[0]; // Extract YYYY-MM-DD

        const foundExpense = formattedDailyData.find(
          (data) =>
            new Date(data.day).toISOString().split("T")[0] === currentDateString
        );

        dailyExpenses.push(
          foundExpense || { day: new Date(current), total: 0 }
        );

        // Move to the next day
        current.setDate(current.getDate() + 1);
      }
    }

    // 🔹 Convert BigInt values to regular Numbers
    const formattedSummary = summary.map((row) => ({
      total: Number(row.total), // Convert BigInt to Number
      highest: Number(row.highest), // Convert BigInt to Number
      count: Number(row.count), // Convert BigInt to Number
      dailyExpenseData: dailyExpenses || [],
    }));

    return new Response(JSON.stringify(formattedSummary), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching expense summary:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
