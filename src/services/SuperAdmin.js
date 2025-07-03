import axios from "axios";
import { ALL_ADMIN_URL, CREATE_ADMIN } from "./api";
import { getTokenHeader } from "./AdminAPI";
import { toast } from "sonner";

// get all admins
export async function fetchAllAdminsAPI() {
  try {
    const response = await axios.get(ALL_ADMIN_URL, getTokenHeader());
    return { success: true, admins: response.data?.data || [] };
  } catch (error) {
    console.error("Failed to fetch admins:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Error fetching admins",
    };
  }
}

// create a new admin acc
export async function CreateAdminAcc(data, form) {
  try {
    const res = await axios.post(CREATE_ADMIN, data, getTokenHeader());
    if (res.data.success) {
      form.reset();
      toast.success("Admin account created successfuly!", {
        duration: 4000,
        position: "top-center",
      });
      return { success: true };
    }
  } catch (error) {
    const message = error.response?.data?.message;

    if (message === "user already exist") {
      form.setError("email", { message });
    } else {
      toast.error("An unexpected error occurred. Please try again later.", {
        duration: 4000,
        position: "top-center",
      });
    }
    return { success: false };
  }
}
