import { AlertTriangle } from "lucide-react";
import { Navigate, Outlet } from "react-router";

import LoaderFullScreen from "@/components/LoaderFullScreen";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import useUser from "@/features/auth/useUser";

import { axiosErrorHandler } from "@/lib/utils";

import authImg from "/login.jpg";

export default function AuthLayout() {
  const { isLoading, data: user, error } = useUser();
  if (isLoading) return <LoaderFullScreen />;

  if (error)
    return (
      <div>{axiosErrorHandler(error, "An unexpected error occurred.")}</div>
    );

  if (user) return <Navigate to="/" replace />;

  return (
    <div className="grid grid-cols-2 gap-10 min-h-dvh">
      <div className="max-lg:col-span-2 order-1 space-y-10 w-[80%] mx-auto flex flex-col justify-center">
        <Alert className="max-w-lg mx-auto bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800">
          <AlertTriangle />
          <AlertTitle>Attention Please!</AlertTitle>
          <AlertDescription className="text-yellow-600">
            This is a demo version of the site. You can log in using a
            pre-registered account with default credentials shown on the login
            form, or create a new one for testing purposes.
          </AlertDescription>
        </Alert>

        <Outlet />
      </div>{" "}
      <div className="h-dvh max-lg:hidden">
        <img
          src={authImg}
          alt="Auth Layout image"
          className="object-cover h-full w-full"
        />
      </div>
    </div>
  );
}
