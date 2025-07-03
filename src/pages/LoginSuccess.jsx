import { BadgeCheck } from "lucide-react";
import { Link } from "react-router";

export default function LoginSuccess({ login, resetPassword }) {
  return (
    <div className="h-dvh w-full flex flex-col items-center justify-center col-span-2 font-bold gap-4">
      <BadgeCheck className="text-green-600" size={48} strokeWidth={3} />
      <h1 className="text-2xl text-center">
        {login
          ? "You are logged in successfully!"
          : resetPassword
          ? "You have successfully reset your password!"
          : ""}
      </h1>
      {login ? (
        <Link to="/" className="underline hover:text-blue-900">
          home page
        </Link>
      ) : (
        <Link to="/auth" className="underline hover:text-blue-900">
          login now
        </Link>
      )}
    </div>
  );
}
