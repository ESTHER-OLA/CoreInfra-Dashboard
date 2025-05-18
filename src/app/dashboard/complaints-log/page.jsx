"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  FileText,
  X,
  Upload,
  MessageSquare,
  Calendar as CalendarIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

export default function ComplaintsLogContent() {
  const [complaints, setComplaints] = useState(
    Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      accountNumber: "0123456789",
      customerName: "Nazeer Ajibola",
      category: "Card Dispute",
      submissionDate: "11/14/2024 10:27:43",
      status: i % 3 === 0 ? "Resolved" : "Pending",
      details: "Customer reported unauthorized transaction on their card.",
      resolvedBy: i % 3 === 0 ? "Manager" : undefined,
      resolutionDate: i % 3 === 0 ? "11/14/2024 10:27:43" : undefined,
    }))
  );

  const [activeTab, setActiveTab] = useState("Pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLogComplaintDialogOpen, setIsLogComplaintDialogOpen] =
    useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [filterCriteria, setFilterCriteria] = useState({
    category: "",
    accountNumber: "",
    customerName: "",
  });
  const [selectedDate, setSelectedDate] = useState(null);

  const [newComplaint, setNewComplaint] = useState({
    category: "",
    accountNumber: "",
    customerName: "",
    details: "",
    attachment: null,
  });

  const itemsPerPage = 15;

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesStatus = complaint.status === activeTab;
    const matchesSearch =
      complaint.accountNumber.includes(searchTerm) ||
      complaint.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate = selectedDate
      ? format(new Date(complaint.submissionDate), "yyyy-MM-dd") ===
        format(selectedDate, "yyyy-MM-dd")
      : true;

    return matchesStatus && matchesSearch && matchesDate;
  });

  const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage);
  const paginatedComplaints = filteredComplaints.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComplaint((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterInputChange = (e) => {
    const { name, value } = e.target;
    setFilterCriteria((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setNewComplaint((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterSelectChange = (name, value) => {
    setFilterCriteria((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewComplaint((prev) => ({ ...prev, attachment: e.target.files[0] }));
    }
  };

  const handleLogComplaint = () => {
    const newId =
      complaints.length > 0 ? Math.max(...complaints.map((c) => c.id)) + 1 : 1;
    const currentDate = new Date().toLocaleString();

    setComplaints([
      ...complaints,
      {
        id: newId,
        accountNumber: newComplaint.accountNumber,
        customerName: newComplaint.customerName,
        category: newComplaint.category,
        submissionDate: currentDate,
        status: "Pending",
        details: newComplaint.details,
        attachment: newComplaint.attachment
          ? newComplaint.attachment.name
          : undefined,
      },
    ]);

    setNewComplaint({
      category: "",
      accountNumber: "",
      customerName: "",
      details: "",
      attachment: null,
    });

    setIsLogComplaintDialogOpen(false);
  };

  const handleApplyFilter = () => {
    // Placeholder for applying filters, just closes the dialog here
    setIsFilterDialogOpen(false);
  };

  const handleViewDetails = (complaint) => {
    setSelectedComplaint(complaint);
    setIsViewDetailsOpen(true);
  };

  return (
    <>
      <main className="flex-1 overflow-auto p-6">
        <div className="border-b-2 p-3">
          <h1 className="text-2xl font-semibold mb-2">Complaints: Log</h1>
          <p className="text-gray-500">
            View details of logged complaints and log new ones here.
          </p>
        </div>

        <div className="flex flex-col">
          <div className="flex justify-between p-4">
            <Tabs
              defaultValue="Pending"
              value={activeTab}
              onValueChange={(value) => {
                if (value === "Pending" || value === "Resolved") {
                  setActiveTab(value);
                  setCurrentPage(1);
                }
              }}
            >
              <TabsList>
                {["Pending", "Resolved"].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="flex items-center gap-2"
                  >
                    {activeTab === tab && (
                      <span className="inline-block w-3 h-3 rounded-full bg-blue-600"></span>
                    )}
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>
              {/* <TabsList>
                <TabsTrigger value="Pending">Pending</TabsTrigger>
                <TabsTrigger value="Resolved">Resolved</TabsTrigger>
              </TabsList> */}
            </Tabs>

            <Dialog
              open={isLogComplaintDialogOpen}
              onOpenChange={setIsLogComplaintDialogOpen}
            >
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <FileText className="h-4 w-4 mr-2" />
                  Log Complaint
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <div className="flex items-center">
                    <div className="border p-3 rounded-lg mr-4">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <DialogTitle>Log Complaint</DialogTitle>
                      <p className="text-sm text-gray-500 mt-1">
                        Select category and fill in details
                      </p>
                    </div>
                    <button
                      className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                      onClick={() => setIsLogComplaintDialogOpen(false)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Close</span>
                    </button>
                  </div>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newComplaint.category}
                      onValueChange={(value) =>
                        handleSelectChange("category", value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category from dropdown" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Card Dispute">
                          Card Dispute
                        </SelectItem>
                        <SelectItem value="Transaction Error">
                          Transaction Error
                        </SelectItem>
                        <SelectItem value="Card Activation">
                          Card Activation
                        </SelectItem>
                        <SelectItem value="PIN Issue">PIN Issue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number*</Label>
                    <Input
                      id="accountNumber"
                      name="accountNumber"
                      value={newComplaint.accountNumber}
                      onChange={handleInputChange}
                      placeholder="Enter account number"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customerName">Customer Name*</Label>
                    <Input
                      id="customerName"
                      name="customerName"
                      value={newComplaint.customerName}
                      onChange={handleInputChange}
                      placeholder="Enter customer name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="details">Complaint Details*</Label>
                    <Textarea
                      id="details"
                      name="details"
                      value={newComplaint.details}
                      onChange={handleInputChange}
                      placeholder="Describe complaint..."
                      rows={4}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Upload File (optional)</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <div className="flex flex-col items-center">
                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <span className="text-blue-600">Click to upload</span>
                          <span className="text-gray-500">
                            {" "}
                            or drag and drop
                          </span>
                          <input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            accept=".pdf,.jpg,.jpeg,.png"
                          />
                        </label>
                        <p className="text-xs text-gray-500 mt-1">
                          PDF, JPG (max. 10mb)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  className="w-full bg-button hover:bg-blue-700"
                  onClick={handleLogComplaint}
                >
                  Proceed
                </Button>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex justify-between border-2 p-1 bg-[#F9FAFB]">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search complaint"
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Dialog
                open={isFilterDialogOpen}
                onOpenChange={setIsFilterDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon" className="h-10 w-20">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <div className="flex items-center">
                      <div className="border p-3 rounded-lg mr-4">
                        <Filter className="h-5 w-5" />
                      </div>
                      <div>
                        <DialogTitle>Filter</DialogTitle>
                        <p className="text-sm text-gray-500 mt-1">
                          Select conditions and apply
                        </p>
                      </div>
                      <button
                        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                        onClick={() => setIsFilterDialogOpen(false)}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                      </button>
                    </div>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="filterCategory">Category</Label>
                      <Select
                        value={filterCriteria.category}
                        onValueChange={(value) =>
                          handleFilterSelectChange("category", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category from dropdown" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Card Dispute">
                            Card Dispute
                          </SelectItem>
                          <SelectItem value="Transaction Error">
                            Transaction Error
                          </SelectItem>
                          <SelectItem value="Card Activation">
                            Card Activation
                          </SelectItem>
                          <SelectItem value="PIN Issue">PIN Issue</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="filterAccountNumber">
                        Account Number
                      </Label>
                      <Input
                        id="filterAccountNumber"
                        name="accountNumber"
                        value={filterCriteria.accountNumber}
                        onChange={handleFilterInputChange}
                        placeholder="Enter account number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="filterCustomerName">Customer Name</Label>
                      <Input
                        id="filterCustomerName"
                        name="customerName"
                        value={filterCriteria.customerName}
                        onChange={handleFilterInputChange}
                        placeholder="Enter customer name"
                      />
                    </div>
                  </div>
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={handleApplyFilter}
                  >
                    Apply
                  </Button>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="border-r border-border bg-[#F9FAFB]">
                  Account Number
                </TableHead>
                <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                  Customer Name
                </TableHead>
                <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                  Submission Date
                </TableHead>
                <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                  Category
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedComplaints.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-8 text-gray-500 border-r"
                  >
                    No complaints found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedComplaints.map((complaint) => (
                  <TableRow
                    key={complaint.id}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleViewDetails(complaint)}
                  >
                    <TableCell className="border-r border-border">
                      {complaint.accountNumber}
                    </TableCell>
                    <TableCell className="border-r border-border text-center">
                      {complaint.customerName}
                    </TableCell>
                    <TableCell className="border-r border-border text-center">
                      {complaint.submissionDate}
                    </TableCell>
                    <TableCell className="border-r border-border text-center">
                      {complaint.category}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {filteredComplaints.length > itemsPerPage && (
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </main>

      <Dialog open={isViewDetailsOpen} onOpenChange={setIsViewDetailsOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Complaint Details</DialogTitle>
          </DialogHeader>
          {selectedComplaint && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="space-y-2">
                <Label>Complaint Category</Label>
                <div className="p-3 bg-gray-50 rounded-md">
                  {selectedComplaint.category}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Branch</Label>
                <div className="p-3 bg-gray-50 rounded-md">Head Office</div>
              </div>
              <div className="space-y-2">
                <Label>Account Number</Label>
                <div className="p-3 bg-gray-50 rounded-md">
                  {selectedComplaint.accountNumber}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Customer Name</Label>
                <div className="p-3 bg-gray-50 rounded-md">
                  {selectedComplaint.customerName}
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Complaint Details</Label>
                <div className="p-3 bg-gray-50 rounded-md min-h-[100px]">
                  {selectedComplaint.details}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Submission Date</Label>
                <div className="p-3 bg-gray-50 rounded-md">
                  {selectedComplaint.submissionDate}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <div className="p-3 bg-gray-50 rounded-md">
                  <Badge
                    variant="outline"
                    className={
                      selectedComplaint.status === "Resolved"
                        ? "bg-green-100 text-green-800 border-green-200"
                        : "bg-yellow-100 text-yellow-800 border-yellow-200"
                    }
                  >
                    {selectedComplaint.status}
                  </Badge>
                </div>
              </div>
              {selectedComplaint.status === "Resolved" && (
                <>
                  <div className="space-y-2">
                    <Label>Resolved By</Label>
                    <div className="p-3 bg-gray-50 rounded-md">
                      {selectedComplaint.resolvedBy}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Resolution Date</Label>
                    <div className="p-3 bg-gray-50 rounded-md">
                      {selectedComplaint.resolutionDate}
                    </div>
                  </div>
                </>
              )}
              <div className="space-y-2">
                <Label>Attachment</Label>
                <div className="p-3 bg-gray-50 rounded-md">
                  {selectedComplaint.attachment || "None"}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
