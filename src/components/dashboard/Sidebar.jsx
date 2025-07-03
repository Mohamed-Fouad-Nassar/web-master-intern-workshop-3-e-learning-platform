import { Link } from "react-router";
import {
  BookOpen,
  FileText,
  Users,
  Home,
  Globe,
  HelpCircle,
  UserCog,
} from "lucide-react";
import { useIsSuperAdmin } from "@/hooks/useIsSuperAdmin";

const adminsLinks = [
  { to: "/", label: "Website", icon: Globe },
  { to: "/dashboard", label: "Home", icon: Home },
  { to: "/dashboard/lessons", label: "Lessons", icon: BookOpen },
  { to: "/dashboard/exams", label: "Exams", icon: FileText },
  { to: "/dashboard/questions", label: "Questions", icon: HelpCircle },
  { to: "/dashboard/students", label: "Students", icon: Users },
];

const sAdminLinks = [
  { to: "/", label: "Website", icon: Globe },
  { to: "/dashboard", label: "Home", icon: Home },
  { to: "/dashboard/students", label: "Students", icon: Users },
  { to: "/dashboard/admins", label: "Admins", icon: UserCog },
];

export default function Sidebar() {
  const sAdmin = useIsSuperAdmin();

  // display links depending if its super admin or normal admin access
  const links = sAdmin ? sAdminLinks : adminsLinks;
  return (
    <aside className="w-64 bg-white dark:bg-[#1f2937] text-gray-900 dark:text-gray-200 border-r dark:border-gray-700 shadow-sm p-4 space-y-2">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        Dashboard
      </h2>
      {links.map(({ to, label, icon: Icon }) => (
        <Link
          to={to}
          key={label}
          className="flex items-center gap-3 p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <Icon size={18} className="text-gray-600 dark:text-gray-400" />
          <span>{label}</span>
        </Link>
      ))}
    </aside>
  );
}
