import StatsCards from "@/features/admin/StatsCards";
import QuickActions from "@/features/admin/QuickActions";
import { useAllUsers } from "@/hooks/admin/useAllUsers";
import { useLessons } from "@/hooks/admin/useLessons";
import { useExams } from "@/hooks/admin/exams/useExams";
import { useQuestions } from "@/hooks/admin/questions/useQuestions";
import { useIsSuperAdmin } from "@/hooks/useIsSuperAdmin";
import { Cards, SAdminActions } from "./SuperAdmin";
import { UserCog, Users } from "lucide-react";
import { useAllAdmins } from "@/hooks/admin/useAllAdmins";

export default function DashboardHome() {
  const { data: users = [], isLoading: loadingUsers } = useAllUsers();
  const { data: admins = [], isLoading: loadingAdmins } = useAllAdmins();
  const { data: lessons = [], isLoading: loadingLessons } = useLessons();
  const { data: exams = [], isLoading: loadingExams } = useExams();
  const { data: questions = [], isLoading: loadingQuestions } = useQuestions();

  const isLoading =
    loadingUsers ||
    loadingLessons ||
    loadingExams ||
    loadingQuestions ||
    loadingAdmins;

  const stats = {
    students: users.filter((u) => u.role === "user").length,
    lessons: lessons.length,
    exams: exams.length,
    questions: questions.length,
  };

  // super admin shittycards data stuff idk
  const data = [
    {
      title: "Students",
      value: users.length,
      icon: <Users className="text-primary" />,
    },
    {
      title: "Admins",
      value: admins.length,
      icon: <UserCog className="text-primary" />,
    },
  ];

  const sAdmin = useIsSuperAdmin();

  return (
    <div className="space-y-6 px-4 py-6">
      <h1 className="text-2xl font-semibold">Dashboard Overview</h1>

      {isLoading ? (
        <p className="text-muted-foreground">Loading stats...</p>
      ) : sAdmin ? (
        <Cards {...{ data }} />
      ) : (
        <StatsCards stats={stats} />
      )}
      <div className="mt-6">
        {sAdmin ? <SAdminActions /> : <QuickActions />}
      </div>
    </div>
  );
}
