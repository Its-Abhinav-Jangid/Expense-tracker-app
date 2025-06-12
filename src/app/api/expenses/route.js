import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

export async function GET(request) {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return new Response(
      JSON.stringify({ msg: "Unauthorized, please login and try again" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const minAmount = searchParams.get("minAmount");
  const maxAmount = searchParams.get("maxAmount");
  const category = searchParams.get("category");
  const limit = Number(searchParams.get("limit")) || 500;
  const query = {
    user_id: session.user.id,
  };
  if (startDate && endDate) {
    query.date = {
      gte: new Date(startDate),
      lte: new Date(endDate),
    };
  } else if (startDate || endDate) {
    if (startDate) {
      query.date = {
        gte: startDate,
      };
    }
    if (endDate) {
      query.date = {
        lte: endDate,
      };
    }
  }
  if (minAmount && maxAmount) {
    query.amount = {
      gte: parseFloat(minAmount),
      lte: parseFloat(maxAmount),
    };
  } else if (minAmount || maxAmount) {
    if (minAmount) {
      query.amount = {
        gte: parseFloat(minAmount),
      };
    }
    if (maxAmount) {
      query.amount = {
        lte: parseFloat(maxAmount),
      };
    }
  }

  if (category) {
    const validCategoryDb = await prisma.expenses.findMany({
      distinct: ["category"],
      select: {
        category: true,
      },
    });
    const validCategories = new Set();
    validCategoryDb.map((category) => validCategories.add(category.category));

    if (!validCategories.has(category)) {
      return new Response(
        JSON.stringify({ msg: "Invalid category provided" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    query.category = category;
  }

  try {
    const expenseData = await prisma.expenses.findMany({
      where: query,
      orderBy: {
        date: "desc",
      },
      take: limit,
    });

    return new Response(JSON.stringify(expenseData), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    console.error(error);

    return new Response(JSON.stringify({ msg: "Some server error occured" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 500,
    });
  }
}

export async function POST(request) {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return new Response(
      JSON.stringify({ msg: "Unauthorized, please login and try again" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
  const data = await request.json();
  const newExpense = await prisma.expenses.create({
    data: {
      amount: parseFloat(data.amount),
      category: data?.category,
      user_id: session.user.id,
      date: data?.date ? new Date(data?.date) : new Date(),
      notes: data?.notes || "",
    },
  });
  return new Response(
    JSON.stringify({
      msg: "Expense Added Successfully",
      newExpense: newExpense,
    }),
    {
      status: 201,
    }
  );
}
