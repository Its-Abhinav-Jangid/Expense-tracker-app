import { auth } from "./auth";
import { NextResponse } from "next/server";

export default async function middleware(req) {
  const { nextUrl } = req;

  const session = await auth();

  // List of protected routes
  const protectedRoutes = ["/app", "/app/stats", "/app/history", "/app/more"];

  if (protectedRoutes.includes(nextUrl.pathname) && !session) {
    console.log("User not authenticated, redirecting...");
    return NextResponse.redirect(new URL("/signin", nextUrl));
  }

  return NextResponse.next();
}
