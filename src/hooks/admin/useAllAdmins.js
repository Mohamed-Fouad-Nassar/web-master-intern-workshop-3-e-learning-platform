// src/features/admin/useAllAdmins.js
import { useQuery } from "@tanstack/react-query";
import { fetchAllAdminsAPI } from "@/services/SuperAdmin";

export function useAllAdmins() {
  return useQuery({
    queryKey: ["all-admins"],
    queryFn: async () => {
      const result = await fetchAllAdminsAPI();
      if (!result.success) throw new Error(result.message);
      return result.admins;
    },
  });
}
