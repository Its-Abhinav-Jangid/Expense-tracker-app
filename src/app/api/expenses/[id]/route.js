import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";
const prisma = new PrismaClient();

export async function GET(_request, { params }) {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return new Response(
      JSON.stringify({ msg: "Unauthorized, please login and try again" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
  const { id } = await params;

  if (Number.isNaN(parseInt(id))) {
    return new Response(JSON.stringify({ msg: "Invalid ID type" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const expenseData = await prisma.expenses.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!expenseData) {
      return new Response(JSON.stringify({ msg: "Expense not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (expenseData.userId !== session.user.id) {
      return new Response(
        JSON.stringify({
          msg: "Sorry, you are unauthorized to view this resource",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify(expenseData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Database Error:", error);
    return new Response(JSON.stringify({ msg: "Server error occurred" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
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

  if (Number.isNaN(parseInt(id))) {
    return new Response(JSON.stringify({ msg: "Invalid id type" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const deletedExpenseData = await prisma.expenses.delete({
      where: {
        id: parseInt(id),
        user_id: session.user.id,
      },
    });

    return new Response(
      JSON.stringify({
        msg: "Expense deleted successfully",
        deletedItem: deletedExpenseData,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    if (error.code === "P2025") {
      return new Response(JSON.stringify({ msg: "Expense not found" }), {
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
export async function PUT(request, { params }) {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return new Response(
      JSON.stringify({ msg: "Unauthorized, please login and try again" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
  const { id } = await params;
  if (Number.isNaN(parseInt(id))) {
    return new Response(JSON.stringify({ msg: "Invalid id type" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  const data = await request.json();
  try {
    const updatedExpenseData = await prisma.expenses.update({
      data: {
        amount: parseFloat(data?.amount),
        category: data?.category,
      },
      where: {
        id: parseInt(id),
        user_id: session.user.id,
      },
    });

    return new Response(
      JSON.stringify({
        msg: "Expense updated successfully",
        updatedItem: updatedExpenseData,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    if (error.code === "P2025") {
      return new Response(JSON.stringify({ msg: "Expense not found" }), {
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
