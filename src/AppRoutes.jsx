import { lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import NotFound from "@/pages/NotFound";
import ScrollToTop from "@/components/ScrollToTop";
import SuspenseFallback from "@/components/SuspenseFallback";
import { Toaster } from "sonner";

const MainLayout = lazy(() => import("@/layouts/MainLayout"));
const AuthLayout = lazy(() => import("@/layouts/AuthLayout"));
const ProfileLayout = lazy(() => import("@/layouts/ProfileLayout"));
const DashboardLayout = lazy(() => import("@/layouts/DashboardLayout"));

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Login = lazy(() => import("@/pages/Login"));
const Lessons = lazy(() => import("@/pages/Lessons"));
const Profile = lazy(() => import("@/pages/Profile"));
const Register = lazy(() => import("@/pages/Register"));
const DashboardHome = lazy(() => import("@/pages/DashboardHome"));
const ForgotPassword = lazy(() => import("@/pages/ForgotPassword"));
const StartExam = lazy(() => import("@/pages/StartExam"));
const TakeExam = lazy(() => import("@/pages/TakeExam"));
const ExamResults = lazy(() => import("@/pages/ExamResults"));

const DashLessons = lazy(() => import("@/pages/dashboard/dashLessons"));
const DashExams = lazy(() => import("@/pages/dashboard/dashExams"));
const DashQuestions = lazy(() => import("@/pages/dashboard/dashQuestions"));
const DashStudents = lazy(() => import("@/pages/dashboard/dashStudents"));

const Unauthorized = lazy(() => import("@/pages/Unauthorized"));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Main Layout */}
        <Route
          path="/"
          element={
            <SuspenseFallback>
              <MainLayout />
            </SuspenseFallback>
          }
        >
          <Route
            index
            element={
              <SuspenseFallback>
                <Home />
              </SuspenseFallback>
            }
          />
          <Route
            path="about"
            element={
              <SuspenseFallback>
                <About />
              </SuspenseFallback>
            }
          />
          <Route
            path="lessons"
            element={
              <SuspenseFallback>
                <Lessons />
              </SuspenseFallback>
            }
          />
        </Route>

        {/* Auth Layout */}
        <Route
          path="/auth"
          element={
            <SuspenseFallback>
              <AuthLayout />
            </SuspenseFallback>
          }
        >
          <Route index element={<Navigate to="login" replace />} />
          <Route
            path="login"
            element={
              <SuspenseFallback>
                <Login />
              </SuspenseFallback>
            }
          />
          <Route
            path="register"
            element={
              <SuspenseFallback>
                <Register />
              </SuspenseFallback>
            }
          />
          <Route
            path="forgot-password"
            element={
              <SuspenseFallback>
                <ForgotPassword />
              </SuspenseFallback>
            }
          />
        </Route>

        {/* Profile Layout */}
        <Route
          path="profile"
          element={
            <SuspenseFallback>
              <ProfileLayout />
            </SuspenseFallback>
          }
        >
          <Route
            index
            element={
              <SuspenseFallback>
                <Profile />
              </SuspenseFallback>
            }
          />
          {/* <Route path="settings" element={<div>Profile Settings</div>} /> */}
        </Route>

        {/* Exam Routes */}
        <Route
          path="/start/:examId"
          element={
            <SuspenseFallback>
              <StartExam />
            </SuspenseFallback>
          }
        />
        <Route
          path="/exam/:examId"
          element={
            <SuspenseFallback>
              <TakeExam />
            </SuspenseFallback>
          }
        />
        <Route
          path="/exams/score/:examId"
          element={
            <SuspenseFallback>
              <ExamResults />
            </SuspenseFallback>
          }
        />

        {/* Dashboard Layout */}
        <Route
          path="/dashboard"
          element={
            <SuspenseFallback>
              <DashboardLayout />
            </SuspenseFallback>
          }
        >
          <Route
            index
            element={
              <SuspenseFallback>
                <DashboardHome />
              </SuspenseFallback>
            }
          />
          <Route
            path="lessons"
            element={
              <SuspenseFallback>
                <DashLessons />
              </SuspenseFallback>
            }
          />
          <Route
            path="exams"
            element={
              <SuspenseFallback>
                <DashExams />
              </SuspenseFallback>
            }
          />
          <Route
            path="students"
            element={
              <SuspenseFallback>
                <DashStudents user="user"/>
              </SuspenseFallback>
            }
          />
          <Route
            path="questions"
            element={
              <SuspenseFallback>
                <DashQuestions />
              </SuspenseFallback>
            }
          />
          {/* for s_admin only */}
          <Route
            path="admins"
            element={
              <SuspenseFallback>
                <DashStudents user="admin" />
              </SuspenseFallback>
            }
          />
          {/* <Route path="settings" element={<DashboardSettings />} /> */}
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />

        {/* Unauthorized Page */}
        <Route
          path="/unauthorized"
          element={
            <SuspenseFallback>
              <Unauthorized />
            </SuspenseFallback>
          }
        />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
