"use client";
import { login } from "../lib/actions/auth";

import { FaGithub } from "react-icons/fa";

export default function LoginButton({ loading }) {
  return (
    <button
      onClick={() => login()}
      className="flex items-center justify-center w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={loading}
    >
      <FaGithub className="mr-2 text-lg" />
      {loading ? "Signing in..." : "Sign in with GitHub"}
    </button>
  );
}
