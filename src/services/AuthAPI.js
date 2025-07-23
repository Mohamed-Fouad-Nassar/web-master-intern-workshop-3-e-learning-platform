import axios from "axios";
import { toast } from "sonner";

import {
  LOGIN_URL,
  SIGNUP_URL,
  RESET_PASSWORD_URL,
  FORGOT_PASSWORD_URL,
  USER_URL,
} from "./api";

// import { axiosErrorHandler } from "@/lib/utils";

// handles user login, sets form errors, and stores token on success
// export async function loginUser(data, form) {
//   try {
//     const response = await axios.post(LOGIN_URL, data);
//     form.reset();
//     localStorage.setItem("token", response.data?.token);
//     return { success: true };
//   } catch (error) {
//     const message = error.response?.data?.message;

//     if (message === "invalid credentials") {
//       form.setError("password", { message: "Password is wrong" });
//     } else if (message === "user not found") {
//       form.setError("email", {
//         message: "No user was found with this email",
//       });
//     } else if (message === "user not verified") {
//       form.setError("email", {
//         message: "Please verify your email before logging in, check your mails",
//       });
//     } else {
//       form.setError("password", {
//         message:
//           "password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number",
//       });
//     }
//     return { success: false };
//   }
// }

export async function loginUser(data) {
  const res = await axios.post(LOGIN_URL, data);
  if (!res.data.success) throw new Error(res.data.message);

  return res.data;
}

export async function getCurrentUser(token) {
  if (!token) throw new Error("Token not provided");

  const res = await axios.get(USER_URL, {
    headers: {
      token,
    },
  });

  if (!res.data.success) throw new Error(res.data.message);

  return res.data.data;
}

// ffs leave this it updates the validation
// handles user registration, sets form errors, and shows toast on success or error
export async function RegisterUser(userData, form) {
  try {
    const res = await axios.post(SIGNUP_URL, userData);
    console.log(res);
    if (res.data.success) {
      form.reset();
      toast.success(
        "Account created! A verification email will be sent to you in moments.",
        {
          duration: 4000,
          position: "top-center",
        }
      );
      return { success: true };
    }
  } catch (error) {
    const message = error.response?.data?.message;

    const errMessage = "email already used or phone number";
    if (message === "user already exist") {
      form.setError("email", { message: errMessage });
      form.setError("phoneNumber", { message: errMessage });
    } else {
      toast.error("An unexpected error occurred. Please try again later.", {
        duration: 4000,
        position: "top-center",
      });
    }
    return { success: false };
  }
}
export async function registerUser(data) {
  const res = await axios.post(SIGNUP_URL, data);
  if (!res.data.success) throw new Error(res.data.message);

  return res.data;
}

// handles password reset with OTP, sets form errors, and shows toast on error
export async function resetPassword(setActionSuccess, data, form) {
  try {
    const res = await axios.post(RESET_PASSWORD_URL, data);
    if (res.data.success) {
      setActionSuccess(true);
    }
  } catch (err) {
    const message = err.response?.data?.message;
    if (message === "invalid OTP") {
      form.setError("otp", {
        message: "Invalid OTP. Please make sure its correct.",
      });
    } else if (message === "user not found") {
      form.setError("email", {
        message: "No user was found with this email.",
      });
    } else {
      toast.error("An unexpected error occurred. Please try again later.", {
        duration: 4000,
        position: "top-center",
      });
    }
  }
}

// handles forgot password, sends reset link, sets form errors, and shows toast on success
export async function forgotPassword(data, form, setShowResetPassword) {
  try {
    const res = await axios.post(FORGOT_PASSWORD_URL, data);
    if (res.data.success) {
      setShowResetPassword(true);
      toast.success("Reset link sent to your email.", {
        duration: 4000,
        position: "top-center",
      });
    }
  } catch (err) {
    const message = err.response?.data?.message;
    if (message === "invalid credentials") {
      form.setError("email", {
        message: "No user was found by this email.",
      });
    }
  }
}
