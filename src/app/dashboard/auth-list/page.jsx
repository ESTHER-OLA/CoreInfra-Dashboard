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
import { Switch } from "@/components/ui/switch";

export default function AuthListContent() {
  const [authItems, setAuthItems] = useState([
    { id: 1, menu: "Users", access: "Create", enabled: true },
    { id: 2, menu: "Users", access: "Edit", enabled: true },
    { id: 3, menu: "Roles", access: "Full", enabled: true },
    { id: 4, menu: "Roles", access: "Create", enabled: false },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleToggle = (id, checked) => {
    setAuthItems(
      authItems.map((item) =>
        item.id === id ? { ...item, enabled: checked } : item
      )
    );
  };

  const filteredItems = authItems.filter(
    (item) =>
      item.menu.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.access.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="flex-1 overflow-auto p-6">
      <div className="border-b p-3 mb-3">
        <h1 className="text-2xl font-semibold mb-2">Authorization List</h1>
        <p className="text-gray-500">
          Shows list of all users with authorized roles.
        </p>
      </div>

      <div className="flex justify-between items-center mb-3 border p-1">
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
                Menu
              </TableHead>
              <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                Access
              </TableHead>
              <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                Enabled
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
                  colSpan={4}
                  className="text-center py-8 text-gray-500 border-r"
                >
                  No authorization items found.
                </TableCell>
              </TableRow>
            ) : (
              filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="border-r border-border">
                    {item.menu}
                  </TableCell>
                  <TableCell className="border-r border-border text-center">
                    {item.access}
                  </TableCell>
                  <TableCell className="border-r border-border text-center">
                    <Switch
                      checked={item.enabled}
                      onCheckedChange={(checked) =>
                        handleToggle(item.id, checked)
                      }
                      className="data-[state=checked]:bg-button bg-gray-100"
                    />
                  </TableCell>
                  <TableCell className="border-r border-border text-center">
                    <Button variant="link" className="text-blue-600 p-0 h-auto">
                      Configure
                    </Button>
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
