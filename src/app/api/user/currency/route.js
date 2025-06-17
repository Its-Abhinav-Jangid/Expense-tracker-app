import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

export async function GET() {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return new Response(
      JSON.stringify({ msg: "Unauthorized, please login and try again" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
  try {
    const currency = await prisma.user.findUnique({
      select: {
        currencyCode: true,
      },
      where: {
        id: session.user.id,
      },
    });
    return new Response(JSON.stringify(currency), {
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
export async function PUT(request) {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return new Response(
      JSON.stringify({ msg: "Unauthorized, please login and try again" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
  const data = await request.json();
  if (!data.currencyCode) {
    return new Response(JSON.stringify({ msg: "No currency code provided." }), {
      status: 400,
    });
  }
  try {
    const currency = await prisma.user.update({
      data: {
        currencyCode: data?.currencyCode,
      },
      where: {
        id: session.user.id,
      },
    });
    return new Response(
      JSON.stringify({
        msg: "Currency updated!",
        currencyCode: currency.currencyCode,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 200,
      }
    );
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
