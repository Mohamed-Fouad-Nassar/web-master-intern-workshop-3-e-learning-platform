import React, { useState } from "react";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 5;

export default function StudentsTable({
  user_role,
  data,
  onShow,
  onEdit,
  onDelete,
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const paginatedStudents = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-4">
      <Table className="bg-white dark:bg-gray-900 border rounded-md shadow-sm">
        <TableCaption className="text-sm text-muted-foreground">
          List of registered students
        </TableCaption>
        <TableHeader>
          <TableRow>
            {(user_role === "admin" ? adminsHeader : studentsHeader).map(
              (header) => (
                <TableHead key={header}>
                  {header.charAt(0).toUpperCase() + header.slice(1)}
                </TableHead>
              )
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedStudents.map((s) => (
            <TableRow key={s._id}>
              <TableCell className="text-xs text-muted-foreground">
                {s._id.slice(0, 6)}...
              </TableCell>
              <TableCell>{s.fullName}</TableCell>
              <TableCell>{s.email}</TableCell>
              <TableCell>{s.phoneNumber}</TableCell>
              {user_role !== "admin" && <TableCell>{s.classLevel}</TableCell>}
              <TableCell>{s.role}</TableCell>
              {user_role !== "admin" && (
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      s.isVerified
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {s.isVerified ? "Active" : "Inactive"}
                  </span>
                </TableCell>
              )}
              <TableCell className="space-x-2">
                <Button size="sm" variant="ghost" onClick={() => onShow?.(s)}>
                  <Eye size={16} />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => onEdit?.(s)}>
                  <Pencil size={16} />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => onDelete?.(s)}>
                  <Trash size={16} className="text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={currentPage === i + 1}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

const studentsHeader = [
  "id",
  "full name",
  "email",
  "phone",
  "class level",
  "role",
  "status",
  "actions",
];

const adminsHeader = ["id", "full name", "email", "phone", "role", "actions"];
