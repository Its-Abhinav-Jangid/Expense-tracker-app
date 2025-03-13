"use client";
import { logout } from "../lib/actions/auth";

export default function LogoutButton() {
  return <button onClick={() => logout()}>Logout</button>;
}
