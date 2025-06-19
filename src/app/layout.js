import "./globals.css";
import NavBar from "./components/NavBar/NavBar";
import ClientWrapper from "./ClientWrapper";
import { SessionProvider } from "next-auth/react";

export const metadata = {
  title: "Expense Tracker App",
  description:
    "An app which allows users to add and track their expenses and view their spending habits",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="Spenlys" />
      </head>
      <body className="min-h-screen text-white bg-gray-900 pb-[100px]">
        <ClientWrapper>
          <SessionProvider>{children}</SessionProvider>
          <NavBar />
        </ClientWrapper>
      </body>
    </html>
  );
}
