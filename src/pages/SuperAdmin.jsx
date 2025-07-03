import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterSchema,
  RegisterSchemaNoClassLevel,
} from "@/validations/RegisterSchema";
import { CreateAdminAcc } from "@/services/SuperAdmin";
import { Form } from "@/components/ui/form";
import { RegisterFormInputs } from "@/features/auth/RegisterForm";

export const Cards = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {data.map((card) => (
        <Card
          key={card.title}
          className="bg-card text-card-foreground shadow-sm border border-border"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            {card.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export const SAdminActions = () => {
  const [modal, setModal] = useState(false);
  const form = useForm({
    resolver: zodResolver(RegisterSchemaNoClassLevel),
    defaultValues,
  });

  // toggle the password visibility
  const [showPassword, setShowPassword] = useState(false);

  // on submit handler
  const onSubmit = async (data) => {
    const { fn, ln, ...rest } = data;
    const userData = {
      ...rest,
      fullName: `${fn} ${ln}`,
    };

    await CreateAdminAcc(userData,form);
  };

  return (
    <>
      <Button onClick={() => setModal((prev) => !prev)} className="flex gap-2">
        <PlusCircle size={16} />
        Add admin
      </Button>
      {/* modal */}
      <div
        onClick={() => setModal((prev) => !prev)}
        className={`absolute z-50 w-full h-dvh cursor-pointer flex items-center justify-center left-0 top-0 bg-black/80 transition-all duration-300 ${
          modal ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            onClick={(e) => e.stopPropagation()}
            className="w-[90%] flex flex-col gap-6 [&_label]:font-bold [&_label]:text-lg"
          >
            <RegisterFormInputs
              {...{
                onSubmit,
                form,
                showPassword,
                setShowPassword,
                admin: true,
              }}
            />
          </form>
        </Form>
      </div>
    </>
  );
};

const defaultValues = {
  fn: "",
  ln: "",
  email: "",
  password: "",
  cpassword: "",
  phoneNumber: "",
};
