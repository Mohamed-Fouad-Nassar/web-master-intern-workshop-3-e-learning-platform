import SubmitBtn from "@/components/SubmitBtn";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router";

export function RegisterFormInputs({
  form,
  showPassword,
  setShowPassword,
  admin,
}) {
  return (
    <>
      {inputFields.map((field, i) => {
        if (Array.isArray(field)) {
          return (
            <div key={i} className="flex w-full gap-8">
              {field.map((subField, j) => (
                <FormField
                  key={j}
                  control={form.control}
                  name={subField.name}
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                      <FormLabel htmlFor={subField.name}>
                        {subField.label}
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            className="auth-input"
                            id={subField.name}
                            type={
                              subField.type === "password" && showPassword
                                ? "text"
                                : subField.type
                            }
                            placeholder={subField.placeholder}
                            {...field}
                          />
                        </FormControl>
                        {subField.type === "password" && (
                          <button
                            onClick={() => setShowPassword((prev) => !prev)}
                            type="button"
                            className="input-icon"
                          >
                            {showPassword ? <Eye /> : <EyeOff />}
                          </button>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          );
        }

        return (
          <div key={i}>
            {field.type === "select" ? (
              !admin && (
                <FormField
                  control={form.control}
                  name={field.name}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
                      <FormControl>
                        <Select id={field.name} {...field}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Class Level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Select Class Level</SelectLabel>
                              <SelectItem value="Grade 1 Secondary">
                                Grade 1 Secondary
                              </SelectItem>
                              <SelectItem value="Grade 2 Secondary">
                                Grade 2 Secondary
                              </SelectItem>
                              <SelectItem value="Grade 3 Secondary">
                                Grade 3 Secondary
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )
            ) : (
              <FormField
                control={form.control}
                name={field.name}
                render={({ field: inputProps }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
                    <FormControl>
                      <Input
                        className="auth-input"
                        id={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        {...inputProps}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        );
      })}
      {!admin && (
        <Link to="/auth" className="!mt-0 w-fit underline">
          already have an account? login
        </Link>
      )}
      <SubmitBtn disabled={form.formState.isSubmitting}>
        <h1>Sign Up</h1>
      </SubmitBtn>
    </>
  );
}

const inputFields = [
  [
    {
      type: "text",
      placeholder: "ahmed",
      label: "first name",
      name: "fn",
    },
    {
      type: "text",
      placeholder: "ali",
      label: "last name",
      name: "ln",
    },
  ],
  {
    type: "email",
    placeholder: "example@gmail.com",
    label: "email",
    name: "email",
  },
  [
    {
      type: "password",
      placeholder: "Ahmed@12345",
      label: "password",
      name: "password",
    },
    {
      type: "password",
      placeholder: "Ahmed@12345",
      label: "confirm password",
      name: "cpassword",
    },
  ],
  {
    type: "number",
    placeholder: "0123456789",
    label: "phone number",
    name: "phoneNumber",
  },
  {
    type: "select",
    placeholder: "Select Class Level",
    label: "class level",
    name: "classLevel",
  },
];
