import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";
import axios from "axios";
const prisma = new PrismaClient();

export async function POST(request) {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return new Response(
      JSON.stringify({ msg: "Unauthorized, please login and try again" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const payload = await request.json();
  if (!payload.messages) {
    return new Response(
      JSON.stringify({ role: "error", message: "No messages provided" }),
      {
        status: 400,
      }
    );
  }
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const prevMonth = new Date();

  prevMonth.setMonth(new Date().getMonth() - 1);
  const userExpenses = await prisma.expenses.findMany({
    select: {
      amount: true,
      category: true,
      created_at: true,
    },
    where: {
      user_id: session.user.id,
      created_at: {
        gte: prevMonth,
        lte: tomorrow,
      },
    },
  });

  const chatHistory = [];
  const systemPrompt = {
    role: "system",
    content: `You are FinBot — a smart, friendly financial assistant in a expense tracker app helping ${
      session.user.name
    }.

Here is a summary of their latest expenses:
${JSON.stringify(userExpenses)}

You should only answer questions related to personal finance, budgeting, savings, or expenses.
If the user's query is irrelevant (e.g., not about finance), kindly remind them that you are a financial assistant and can only help with finance-related questions.
Keep the responses shorter and concise.
Always give helpful and personalized suggestions related to managing money. Keep your tone friendly, encouraging, and easy to understand.`,
  };
  chatHistory.push(systemPrompt);
  if (payload.messages.length > 3) {
    payload.messages = payload.messages.slice(
      payload.messages.length - 1 - 3,
      payload.messages.length
    );
  }
  for (let i = 0; i < payload.messages.length; i++) {
    chatHistory.push(payload.messages[i]);
  }

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: process.env.AI_MODEL,
        messages: chatHistory,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.AI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;
    const reply = data.choices?.[0]?.message?.content;
    console.log(data);
    if (!reply) {
      return new Response(
        JSON.stringify(
          { role: "error", content: "No response received" },
          { status: 204 } // no content
        )
      );
    }

    return new Response(
      JSON.stringify({ role: "assistant", content: reply }, { status: 200 })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        role: "error",
        content: "Some internal error occured. Please try again later.",
      }),
      {
        status: 500,
      }
    );
  }
}
