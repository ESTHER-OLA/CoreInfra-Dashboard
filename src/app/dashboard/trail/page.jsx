"use client";

import { useState } from "react";
import { Search, Filter, Calendar, History } from "lucide-react";
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

export default function TrailContent() {
  const [trailItems, setTrailItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredItems = trailItems.filter(
    (item) =>
      item.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="flex-1 overflow-auto p-6">
      <div className="mb-2 border-b p-3">
        <h1 className="text-2xl font-semibold mb-2">Trail</h1>
        <p className="text-gray-500">
          View details of different card trails here.
        </p>
      </div>

      <div className="flex justify-between items-center mb-3 p-1 border">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search"
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
              <TableHead className="border-r bg-[#F9FAFB]">Actor</TableHead>
              <TableHead className="border-r bg-[#F9FAFB] text-center">
                Event
              </TableHead>
              <TableHead className="border-r bg-[#F9FAFB] text-center">
                State
              </TableHead>
              <TableHead className="border-r bg-[#F9FAFB] text-center">
                Device
              </TableHead>
              <TableHead className="border-r bg-[#F9FAFB] text-center">
                Time Stamp
              </TableHead>
              <TableHead className="border-r bg-[#F9FAFB] text-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.length === 0 ? (
              <TableRow>
                {[...Array(6)].map((_, i) => (
                  <TableCell key={i} className="border-r py-4" />
                ))}
              </TableRow>
            ) : (
              filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.actor}</TableCell>
                  <TableCell>{item.event}</TableCell>
                  <TableCell>{item.state}</TableCell>
                  <TableCell>{item.device}</TableCell>
                  <TableCell>{item.timeStamp}</TableCell>
                  <TableCell>
                    <Button variant="link" className="text-blue-600 p-0 h-auto">
                      View
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
