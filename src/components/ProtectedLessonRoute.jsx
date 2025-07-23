import { Loader2 } from "lucide-react";
import { Navigate, useParams } from "react-router";

import { usePaidLesson } from "@/features/lesson/usePaidLesson";

const ProtectedLessonRoute = ({ children, use }) => {
  const { id } = useParams();
  const { data, isLoading, isError } = usePaidLesson(id);
  const hasAccess = !!data && !isError;

  if (isLoading)
    return <Loader2 className="animate-spin size-8 mx-auto my-10" />;

  if (use === "payRoute") {
    if (hasAccess) return <Navigate to={`/lessons/${id}`} replace />;
  } else {
    if (!hasAccess) return <Navigate to={`/lessons/pay/${id}`} replace />;
  }

  return children;
};

export default ProtectedLessonRoute;
