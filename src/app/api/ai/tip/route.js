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

  const userIncome = payload.incomeData;
  const userExpenses = payload.expenseData;
  const userCurrency = payload.userCurrency;
  const financialInsightPrompts = [
    {
      type: "budgeting",
      systemPrompt: (userIncome, userExpenses) => ({
        role: "system",
        content: `You are FinBot, a helpful and friendly financial assistant.

The user is seeking budgeting advice.

Income Summary (last 1 year): ${userCurrency + userIncome.total}
Expense Summary (last 1 year): ${JSON.stringify(userExpenses)}

Give one personalized budgeting tip the user can apply immediately. Keep it practical, short, and encouraging. Keep response of 1-5 lines.`,
      }),
    },
    {
      type: "investment",
      systemPrompt: (userIncome, userExpenses) => ({
        role: "system",
        content: `You are FinBot, an expert in personal finance with a friendly tone.

The user is interested in investment advice.

Their annual income is ${
          userCurrency + userIncome.total
        }. Their expenses: ${JSON.stringify(userExpenses)}

Suggest one actionable and safe investment tip for long-term financial growth. Avoid jargon and keep it easy to understand. Keep response of 1-5 lines.`,
      }),
    },
    {
      type: "debt",
      systemPrompt: (userIncome, userExpenses) => ({
        role: "system",
        content: `You are FinBot, a smart financial coach focused on helping users manage their debt.

The user wants help with debt management.

Their income last year: ${userCurrency + userIncome.total}
Expenses summary: ${JSON.stringify(userExpenses)}

Suggest one effective way to reduce or manage debt better. Be friendly and concise. Keep response of 1-5 lines.`,
      }),
    },
    {
      type: "savings",
      systemPrompt: (userIncome, userExpenses) => ({
        role: "system",
        content: `You are FinBot, a smart assistant who helps people save money.

The user wants to increase their savings.

They earned ${
          userCurrency + userIncome.total
        } and spent across these categories: ${JSON.stringify(userExpenses)}

Give one high-impact savings tip that can help them save 10% more over the next few months. Be short, actionable, and positive.
Keep response of 1-5 lines.`,
      }),
    },
  ];

  const promptType =
    financialInsightPrompts.find((p) => p.type === payload?.type) ??
    financialInsightPrompts[0]; // fallback to budgeting

  const systemPrompt = promptType.systemPrompt(userIncome, userExpenses);

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: process.env.AI_MODEL,
        messages: [systemPrompt],
        max_tokens: 100,
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
    console.error(error);

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
