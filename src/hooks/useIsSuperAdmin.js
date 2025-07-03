import { useState, useEffect } from "react";
import { fetchCurrentUserAPI } from "@/services/AdminAPI";

export function useIsSuperAdmin() {
  const [sAdmin, setSAdmin] = useState(true);

  useEffect(() => {
    fetchCurrentUserAPI().then(({ message }) => {
      setSAdmin(message === "unauthorized to access this api");
    });
  }, []);

  return sAdmin;
}