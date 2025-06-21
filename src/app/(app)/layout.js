import { SessionProvider } from "next-auth/react";
import ClientWrapper from "../ClientWrapper";
import NavBar from "../components/NavBar/NavBar";

function layout({ children }) {
  return (
    <div className="pb-[100px]">
      <ClientWrapper>
        <SessionProvider>{children}</SessionProvider>
        <NavBar />
      </ClientWrapper>
    </div>
  );
}

export default layout;
