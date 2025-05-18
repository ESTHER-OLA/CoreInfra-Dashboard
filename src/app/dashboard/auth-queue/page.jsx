"use client";

import { useState } from "react";
import { Search, Filter, ListChecks } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function AuthQueueContent() {
  const [queueItems, setQueueItems] = useState([
    {
      id: 1,
      initiator: "Nazeer",
      menu: "Branch",
      access: "Create",
      dateRequested: "11/14/2024 10:27:43",
      status: "Pending",
    },
    {
      id: 2,
      initiator: "Nazeer",
      menu: "Users",
      access: "Edit",
      dateRequested: "11/14/2024 10:27:43",
      status: "Pending",
    },
    {
      id: 3,
      initiator: "Nazeer",
      menu: "Roles",
      access: "Full",
      dateRequested: "11/14/2024 10:27:43",
      status: "Pending",
    },
    {
      id: 4,
      initiator: "Nazeer",
      menu: "Roles",
      access: "Create",
      dateRequested: "11/14/2024 10:27:43",
      status: "Pending",
    },
    {
      id: 5,
      initiator: "Nazeer",
      menu: "Card Request",
      access: "Full",
      dateRequested: "11/14/2024 10:27:43",
      status: "Pending",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleApprove = (id) => {
    // In a real app, this would send approval to backend
    setQueueItems(queueItems.filter((item) => item.id !== id));
  };

  const handleDecline = (id) => {
    // In a real app, this would send decline to backend
    setQueueItems(queueItems.filter((item) => item.id !== id));
  };

  const filteredItems = queueItems.filter(
    (item) =>
      item.initiator.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.menu.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.access.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="flex-1 overflow-auto p-6">
      <div className="p-3 border-b-2 mb-2">
        <h1 className="text-2xl font-semibold mb-2">Authorization Queue</h1>
        <p className="text-gray-500">
          Shows the different requests for authorized roles.
        </p>
      </div>

      <div className="flex justify-between items-center mb-2 border p-1">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search user"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Button variant="outline" size="icon" className="h-10 w-20">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </Button>
      </div>

      <div className="bg-white rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="border-r border-border bg-[#F9FAFB]">
                Initiator
              </TableHead>
              <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                Menu
              </TableHead>
              <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                Access
              </TableHead>
              <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                Date Requested
              </TableHead>
              <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                Status
              </TableHead>
              <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-gray-500 border-r"
                >
                  No authorization requests found.
                </TableCell>
              </TableRow>
            ) : (
              filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="border-r border-border text-center">
                    {item.initiator}
                  </TableCell>
                  <TableCell className="border-r border-border text-center">
                    {item.menu}
                  </TableCell>
                  <TableCell className="border-r border-border text-center">
                    {item.access}
                  </TableCell>
                  <TableCell className="border-r border-border text-center">
                    {item.dateRequested}
                  </TableCell>
                  <TableCell className="border-r border-border text-center">
                    <Badge
                      variant="outline"
                      className="bg-yellow-100 text-yellow-800 border-yellow-200 border-r text-lg-center"
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-3 justify-center">
                      <div
                        className="text-green-700 font-bold"
                        onClick={() => handleApprove(item.id)}
                      >
                        Approve
                      </div>
                      <div
                        className="text-red-600 font-bold"
                        onClick={() => handleDecline(item.id)}
                      >
                        Decline
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500">Page 1 of 1</div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </main>
  );
}
