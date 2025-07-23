import { Navigate, useLocation } from "react-router";

import LoaderFullScreen from "./LoaderFullScreen";

import useUser from "@/features/auth/useUser";

export default function ProtectedRoute({ children }) {
  const { pathname } = useLocation();
  const { isLoading, data: user, error } = useUser();

  if (isLoading) return <LoaderFullScreen />;

  if (error || !user) return <Navigate to="/auth" replace />;

  if (user.role !== "admin" && pathname.includes("/dashboard"))
    return <Navigate to="/unauthorized" replace />;

  return children;
}
