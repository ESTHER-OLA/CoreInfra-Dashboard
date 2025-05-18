"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Calendar as CalendarIcon,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  X,
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

export default function ComplaintsResolveContent() {
  const [complaints, setComplaints] = useState(
    Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      accountNumber: "0123456789",
      customerName: "Nazeer Ajibola",
      category: "Card Dispute",
      submissionDate: "11/14/2024 10:27:43",
      status: i % 3 === 0 ? "Treated" : "Pending",
      details: "Customer reported unauthorized transaction on their card.",
      resolutionDate: i % 3 === 0 ? "11/14/2024 10:27:43" : undefined,
      resolutionNotes:
        i % 3 === 0
          ? "Refunded the disputed amount to customer's account."
          : undefined,
      resolvedBy: i % 3 === 0 ? "John Doe" : undefined,
    }))
  );

  const [activeTab, setActiveTab] = useState("Pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [isResolveDialogOpen, setIsResolveDialogOpen] = useState(false);
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [filterCriteria, setFilterCriteria] = useState({
    category: "",
    accountNumber: "",
    customerName: "",
  });

  const [resolutionNotes, setResolutionNotes] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

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

  const handleFilterInputChange = (e) => {
    const { name, value } = e.target;
    setFilterCriteria((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterSelectChange = (name, value) => {
    setFilterCriteria((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilter = () => {
    // In a real app, this would filter the data from an API
    // For demo purposes, we'll just close the dialog
    setIsFilterDialogOpen(false);
  };

  const handleViewDetails = (complaint) => {
    setSelectedComplaint(complaint);
    setIsViewDetailsOpen(true);
  };

  const handleResolveComplaint = (complaint) => {
    setSelectedComplaint(complaint);
    setResolutionNotes("");
    setIsResolveDialogOpen(true);
  };

  const handleSubmitResolution = () => {
    if (!selectedComplaint) return;

    const currentDate = new Date().toLocaleString();

    const updatedComplaints = complaints.map((complaint) =>
      complaint.id === selectedComplaint.id
        ? {
            ...complaint,
            status: "Treated",
            resolutionDate: currentDate,
            resolutionNotes,
            resolvedBy: "Current User",
          }
        : complaint
    );

    setComplaints(updatedComplaints);
    setIsResolveDialogOpen(false);
    setActiveTab("Treated");
  };

  return (
    <>
      <main className="flex-1 overflow-auto p-6">
        <div className="mb-6 border-b-2 p-3">
          <h1 className="text-2xl font-semibold mb-2">Complaints: Resolve</h1>
          <p className="text-gray-500">
            View details of treated complaints and resolve pending ones here.
          </p>
        </div>

        <div className="flex flex-col">
          <Tabs
            defaultValue="Pending"
            value={activeTab}
            onValueChange={(value) => {
              setActiveTab(value);
              setCurrentPage(1);
            }}
          >
            <TabsList>
              {["Pending", "Treated"].map((tab) => (
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
          </Tabs>

          <div className="flex justify-between border-2 p-1 bg-[#F9FAFB] mt-5">
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
                      <div className="bg-gray-100 p-3 rounded-lg mr-4">
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
                {activeTab === "Treated" && (
                  <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                    Resolution Date
                  </TableHead>
                )}
                <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                  Category
                </TableHead>
                {activeTab === "Pending" && (
                  <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                    Action
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedComplaints.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={activeTab === "Treated" ? 5 : 5}
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
                    <TableCell className="border-r border-border text-center">
                      {complaint.accountNumber}
                    </TableCell>
                    <TableCell className="border-r border-border text-center">
                      {complaint.customerName}
                    </TableCell>
                    <TableCell className="border-r border-border text-center">
                      {complaint.submissionDate}
                    </TableCell>
                    {activeTab === "Treated" && (
                      <TableCell className="border-r border-border text-center">
                        {complaint.resolutionDate}
                      </TableCell>
                    )}
                    <TableCell className="border-r border-border text-center">
                      {complaint.category}
                    </TableCell>
                    {activeTab === "Pending" && (
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-green-100 hover:bg-green-200 text-green-800 border-green-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleResolveComplaint(complaint);
                          }}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Resolve
                        </Button>
                      </TableCell>
                    )}
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

      {/* Complaint Details Dialog */}
      <Dialog open={isViewDetailsOpen} onOpenChange={setIsViewDetailsOpen}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Complaint Details</DialogTitle>
          </DialogHeader>
          {selectedComplaint && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              </div>

              <div className="space-y-2">
                <Label>Complaint Details</Label>
                <div className="p-3 bg-gray-50 rounded-md min-h-[100px]">
                  {selectedComplaint.details}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        selectedComplaint.status === "Treated"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : "bg-yellow-100 text-yellow-800 border-yellow-200"
                      }
                    >
                      {selectedComplaint.status === "Treated"
                        ? "Resolved"
                        : "Pending"}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Resolved By</Label>
                  <div className="p-3 bg-gray-50 rounded-md">
                    {selectedComplaint.status === "Treated"
                      ? selectedComplaint.resolvedBy
                      : "-"}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Attachment</Label>
                  <div className="p-3 bg-gray-50 rounded-md">None</div>
                </div>
                <div className="space-y-2">
                  <Label>Resolution Date</Label>
                  <div className="p-3 bg-gray-50 rounded-md">
                    {selectedComplaint.status === "Treated"
                      ? selectedComplaint.resolutionDate
                      : "-"}
                  </div>
                </div>
              </div>

              {selectedComplaint.status === "Pending" && (
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    setIsViewDetailsOpen(false);
                    handleResolveComplaint(selectedComplaint);
                  }}
                >
                  Resolve
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Resolve Complaint Dialog */}
      <Dialog open={isResolveDialogOpen} onOpenChange={setIsResolveDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center">
              <div className="bg-gray-100 p-3 rounded-full mr-4">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <DialogTitle>Resolve Complaint</DialogTitle>
                <p className="text-sm text-gray-500 mt-1">
                  Enter resolution details
                </p>
              </div>
              <button
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                onClick={() => setIsResolveDialogOpen(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </button>
            </div>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedComplaint && (
              <>
                <div className="space-y-2">
                  <Label>Complaint</Label>
                  <div className="p-3 bg-gray-50 rounded-md">
                    {selectedComplaint.details}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resolutionNotes">Resolution Notes*</Label>
                  <Textarea
                    id="resolutionNotes"
                    value={resolutionNotes}
                    onChange={(e) => setResolutionNotes(e.target.value)}
                    placeholder="Enter resolution details..."
                    rows={4}
                    required
                  />
                </div>
              </>
            )}
          </div>
          <Button
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={handleSubmitResolution}
            disabled={!resolutionNotes.trim()}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark as Resolved
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
