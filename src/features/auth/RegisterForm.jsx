import { Link } from "react-router";
import { Eye, EyeOff } from "lucide-react";

import {
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import {
  Select,
  SelectItem,
  SelectLabel,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/LoadingButton";

export function RegisterFormInputs({
  form,
  admin,
  showPassword,
  setShowPassword,
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
                            {showPassword ? (
                              <Eye className="size-4" />
                            ) : (
                              <EyeOff className="size-4" />
                            )}
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
                        <Select
                          id={field.name}
                          value={field.value}
                          onValueChange={field.onChange}
                        >
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

      <LoadingButton type="submit" loading={form.formState.isSubmitting}>
        Sign up
      </LoadingButton>
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
