"use server";

import { signIn, signOut } from "@/auth";

export const login = async (provider) => {
  await signIn(provider, { redirectTo: "/app" });
};
export const logout = async () => {
  await signOut({ redirectTo: "/signin" });
};
