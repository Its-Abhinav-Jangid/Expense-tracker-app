import "./globals.css";
import NavBar from "./components/NavBar/NavBar";
import UserProvider from "@/context/userData";
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
        <UserProvider initialData={initialData}>
          {children}
          <NavBar />
        </UserProvider>
      </body>
    </html>
  );
}
