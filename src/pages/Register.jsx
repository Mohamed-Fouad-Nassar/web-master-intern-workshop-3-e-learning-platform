import { useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/validations/RegisterSchema";

import { Form } from "@/components/ui/form";
import { RegisterFormInputs } from "@/features/auth/RegisterForm";

import { RegisterUser } from "@/services/AuthAPI";

export default function Register() {
  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues,
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    const { fn, ln, ...rest } = data;
    const userData = {
      ...rest,
      fullName: `${fn} ${ln}`,
    };

    await RegisterUser(userData, form);
  };

  return (
    <>
      <h1 className="lg:text-3xl text-xl text-center font-bold">
        Create your account
      </h1>

      <div className="space-y-8 max-w-lg mx-auto flex flex-col justify-center">
        <Form {...form}>
          <form
            className="flex flex-col w-full gap-4 [&_label]:font-bold [&_label]:text-base"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <RegisterFormInputs {...{ form, showPassword, setShowPassword }} />
          </form>
        </Form>

        <p className="text-center text-sm">
          already have an account?{" "}
          <Link to="/auth" className="underline hover:text-primary">
            login
          </Link>
        </p>
      </div>
    </>
  );
}

const defaultValues = {
  fn: "",
  ln: "",
  email: "",
  password: "",
  cpassword: "",
  phoneNumber: "",
  calssLevel: "",
};
