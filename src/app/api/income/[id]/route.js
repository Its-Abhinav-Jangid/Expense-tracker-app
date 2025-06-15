import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();
export async function PUT(request, { params }) {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return new Response(
      JSON.stringify({ msg: "Unauthorized, please login and try again" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
  const { id } = await params;

  if (!id) {
    return new Response(JSON.stringify({ msg: "No ID provided" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  const data = await request.json();
  const updatedIncome = await prisma.income.update({
    data: {
      amount: parseFloat(data.amount),
      isRecurring: Boolean(data?.isRecurring),
      notes: data?.notes,
      category: data?.category,
      date: new Date(data?.date),
      userId: session.user.id,
    },
    where: {
      id: id,
      userId: session.user.id,
    },
  });
  return new Response(
    JSON.stringify({ msg: "Income Updated Successfully", updatedIncome }),
    {
      status: 200,
    }
  );
}
export async function DELETE(_request, { params }) {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return new Response(
      JSON.stringify({ msg: "Unauthorized, please login and try again" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
  const { id } = await params;

  if (!id) {
    return new Response(JSON.stringify({ msg: "No ID provided." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const deletedIncomeData = await prisma.income.delete({
      where: {
        id: id,
        userId: session.user.id,
      },
    });

    return new Response(
      JSON.stringify({
        msg: "Expense deleted successfully",
        deletedItem: deletedIncomeData,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    if (error.code === "P2025") {
      return new Response(JSON.stringify({ msg: "Income not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.error("Database Error:", error);
    return new Response(JSON.stringify({ msg: "Some server error occurred" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
