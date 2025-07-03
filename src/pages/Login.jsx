import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { LoginSchema } from "@/validations/LoginSchema";
import SubmitBtn from "@/components/SubmitBtn";
import { Link } from "react-router";
import LoginSuccess from "./LoginSuccess";
import { loginUser } from "@/services/AuthAPI";

export default function Login() {
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // handle on submit
  const onSubmit = async (data) => {
    await loginUser(data, form);
  };

  // if user is already logged in, redirect to login success page
  if (localStorage.getItem("token")) return <LoginSuccess login={true} />;

  return (
    <Form {...form}>
      <div className="max-lg:col-span-2 order-1 space-y-20 w-[80%] mx-auto flex flex-col justify-center">
        <h1 className="lg:text-3xl text-xl text-center font-bold">
          Sign in to your account
        </h1>
        <form
          className="flex flex-col w-full gap-10 [&_label]:font-bold [&_label]:text-lg"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    className="auth-input"
                    id="email"
                    type="email"
                    placeholder="example@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel htmlFor="password">Password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      className="auth-input"
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Your password"
                      {...field}
                    />
                  </FormControl>
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="input-icon"
                  >
                    {showPassword ? <Eye /> : <EyeOff />}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Link to="/auth/forgot-password" className="!mt-0 w-fit underline">
            Forgot your password?
          </Link>
          <SubmitBtn disabled={form.formState.isSubmitting} type="submit">
            <h1>Login</h1>
          </SubmitBtn>
        </form>
      </div>
      <div className="h-dvh max-lg:hidden">
        <img
          src="/login.jpg"
          alt="Description of image"
          className="object-cover h-full w-full"
        />
      </div>
    </Form>
  );
}
