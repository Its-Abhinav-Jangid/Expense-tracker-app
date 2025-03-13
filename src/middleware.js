import { auth } from "./auth";
import { NextResponse } from "next/server";

export default async function middleware(req) {
  const { nextUrl } = req;

  const session = await auth();

  // List of protected routes
  const protectedRoutes = ["/"];

  if (protectedRoutes.includes(nextUrl.pathname) && !session) {
    console.log("User not authenticated, redirecting...");
    return NextResponse.redirect(new URL("/api/auth/signin", nextUrl));
  }

  return NextResponse.next();
}
