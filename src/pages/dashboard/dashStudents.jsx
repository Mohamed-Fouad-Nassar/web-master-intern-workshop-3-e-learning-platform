import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StudentsTable from "@/features/admin/StudentsTable";
import { useAllUsers } from "@/hooks/admin/useAllUsers";
import { useAllAdmins } from "@/hooks/admin/useAllAdmins";

export default function DashStudents({ user }) {
  const { data, isLoading, isError } =
    user === "admin" ? useAllAdmins() : useAllUsers();
  const [searchType, setSearchType] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");

  const users = data || [];

  const filteredUsers = users.filter((u) => {
    if (searchType === "name") {
      return u.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    }
    if (searchType === "email") {
      return u.email.toLowerCase().includes(searchTerm.toLowerCase());
    }
    if (searchType === "phone") {
      return u.phoneNumber.includes(searchTerm);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Students</h1>

      {/* Search with filter */}
      <div className="flex flex-wrap items-center gap-3">
        <Select value={searchType} onValueChange={setSearchType}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Search by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="phone">Phone</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="text"
          placeholder={`Search by ${searchType}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-[200px]"
        />
      </div>

      {/* Table */}
      {isLoading ? (
        <p className="text-muted-foreground">Loading students...</p>
      ) : isError ? (
        <p className="text-destructive">Error loading students</p>
      ) : (
        <StudentsTable user_role={user} data={filteredUsers} />
      )}
    </div>
  );
}
