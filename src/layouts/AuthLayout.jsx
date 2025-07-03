import Logo from "@/components/Logo";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <>
      <header className="flex items-start justify-between px-6 py-6 bg-white dark:bg-[#09090b] border-b shadow-sm absolute top-0 left-0 w-full">
        <div className="w-[80%] mx-auto">
          <Logo />
        </div>
      </header>
      <div className={"grid grid-cols-2 gap-10 min-h-dvh"}>
        <Outlet />
      </div>
    </>
  );
}
