import { z } from "zod";

export const emailSchema = z
  .string()
  .min(1, { message: "Email is required" })
  .email({ message: "Invalid email address" })
  .max(100, { message: "Email must be less than 100 characters" });

export const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(100, { message: "Password must be less than 100 characters" })
  .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message:
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
  });

export const cpasswordSchema = z.string();

const RegisterSchemaBase = z.object({
  fn: z
    .string()
    .min(1, { message: "First name is required" })
    .max(50, { message: "First name must be less than 50 characters" }),
  ln: z
    .string()
    .min(1, { message: "Last name is required" })
    .max(50, { message: "Last name must be less than 50 characters" }),
  email: emailSchema,
  password: passwordSchema,
  cpassword: cpasswordSchema,
  phoneNumber: z.string().regex(/^01[0-2,5]{1}[0-9]{8}$/, {
    message: "Phone number must be a valid mobile number",
  }),
  classLevel: z.string().min(1, { message: "Class level is required" }),
});

// Normal user schema
export const RegisterSchema = RegisterSchemaBase.refine(
  (data) => data.password === data.cpassword,
  {
    message: "Passwords do not match",
    path: ["cpassword"],
  }
);

// Admin register (classLevel optional)
export const RegisterSchemaNoClassLevel = RegisterSchemaBase.extend({
  classLevel: z.string().optional(),
}).refine((data) => data.password === data.cpassword, {
  message: "Passwords do not match",
  path: ["cpassword"],
});
