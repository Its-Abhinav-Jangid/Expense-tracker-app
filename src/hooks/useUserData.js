"use client";
import { useContext } from "react";
import { UserDataContext } from "@/context/UserData";
export default function useUserData() {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error("useUserData must be used within a UserProvider");
  }

  console.log(context);

  return context;
}
