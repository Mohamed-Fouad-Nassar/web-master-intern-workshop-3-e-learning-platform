import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/LoadingButton";

import useLogin from "./useLogin";

import { LoginSchema } from "@/validations/LoginSchema";

export default function LoginForm({ email = "", password = "" }) {
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email,
      password,
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  const { isLoading, login } = useLogin();

  const onSubmit = async (data) => {
    if (data.email === "S_admin@gmail.com") {
      form.setError("email", {
        type: "manual",
        message: "unauthorized to access this api! lol",
      });
      return null;
    }

    login(data);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col w-full gap-4 [&_label]:font-bold [&_label]:text-base"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input
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
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel htmlFor="password">Password</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    id="password"
                    placeholder="Your password"
                    type={showPassword ? "text" : "password"}
                    {...field}
                  />
                </FormControl>
                <Button
                  size="icon"
                  type="button"
                  variant="ghost"
                  className="absolute right-0 top-1/2 -translate-y-1/2 !bg-transparent"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <Eye /> : <EyeOff />}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton
          type="submit"
          loading={form.formState.isSubmitting || isLoading}
        >
          Login
        </LoadingButton>
      </form>
    </Form>
  );
}
