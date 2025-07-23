import { Link } from "react-router";

import LoginForm from "@/features/auth/LoginForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Login() {
  return (
    <>
      <h1 className="lg:text-3xl text-xl text-center font-bold">
        Sign in to your account
      </h1>

      {/* <LoginForm /> */}
      <Tabs defaultValue="student" className="max-w-lg w-full mx-auto">
        <TabsList className="w-full justify-center mb-4">
          <TabsTrigger value="student">Student</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
        </TabsList>
        <TabsContent value="student">
          <LoginForm email="vibej36131@coasah.com" password="Vibej36131@" />
        </TabsContent>
        <TabsContent value="admin">
          <LoginForm email="team2@gmail.com" password="Team123@" />
        </TabsContent>
      </Tabs>

      <div className="flex flex-col gap-4">
        <p className="text-center text-sm">
          Forgot your password?{" "}
          <Link
            to="/auth/forgot-password"
            className="underline hover:text-primary"
          >
            Reset password
          </Link>
        </p>
        <p className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/auth/register" className="underline hover:text-primary">
            Register a new account
          </Link>
        </p>
      </div>
    </>
  );
}
