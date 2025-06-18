import "./globals.css";
import NavBar from "./components/NavBar/NavBar";
import ClientWrapper from "./ClientWrapper";
import { SessionProvider } from "next-auth/react";
import fetchUserData from "./lib/fetchUserData";

export const metadata = {
  title: "Expense Tracker App",
  description:
    "An app which allows users to add and track their expenses and view their spending habits",
};

export default async function RootLayout({ children }) {
  const initialData = await fetchUserData();

  return (
    <html lang="en">
      <body className="min-h-screen text-white bg-gray-900 pb-[100px]">
        <ClientWrapper initialData={initialData}>
          <SessionProvider>{children}</SessionProvider>
          <NavBar />
        </ClientWrapper>
      </body>
    </html>
  );
}
