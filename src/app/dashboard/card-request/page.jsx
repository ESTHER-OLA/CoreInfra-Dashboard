"use client";

import { useState } from "react";
import {
  Search,
  ChevronLeft,
  FileDown,
  Sparkles,
  CheckCircle,
  CircleCheck,
  Send,
  Check,
  FileText,
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
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function CardRequestContent() {
  const [view, setView] = useState("list");
  const [requests, setRequests] = useState([
    {
      id: 1,
      branch: "Corporate",
      initiator: "RootUser",
      quantity: 10,
      batch: "847264905",
      dateRequested: "11/14/2024 10:27:43",
      status: "Ready",
    },
    {
      id: 2,
      branch: "Corporate",
      initiator: "RootUser",
      quantity: 10,
      batch: "847264905",
      dateRequested: "11/14/2024 10:27:43",
      status: "Ready",
    },
    {
      id: 3,
      branch: "Corporate",
      initiator: "RootUser",
      quantity: 10,
      batch: "847264905",
      dateRequested: "11/14/2024 10:27:43",
      status: "In Progress",
    },
    {
      id: 4,
      branch: "Corporate",
      initiator: "RootUser",
      quantity: 10,
      batch: "847264905",
      dateRequested: "11/14/2024 10:27:43",
      status: "Pending",
    },
    {
      id: 5,
      branch: "Corporate",
      initiator: "RootUser",
      quantity: 10,
      batch: "847264905",
      dateRequested: "11/14/2024 10:27:43",
      status: "Acknowledged",
    },
  ]);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    setView("details");
  };

  const handleStatusChange = (status) => {
    if (selectedRequest) {
      const updatedRequests = requests.map((req) =>
        req.id === selectedRequest.id ? { ...req, status } : req
      );
      setRequests(updatedRequests);
      setSelectedRequest({ ...selectedRequest, status });
    }
  };

  const handleDownloadForProduction = () => {
    setSuccessMessage("Production file has been downloaded.");
    setShowSuccessModal(true);
  };

  const handleSendToDispatch = () => {
    setSuccessMessage("Card batch successfully sent to dispatch.");
    setShowSuccessModal(true);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const filteredRequests = requests.filter(
    (request) =>
      request.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.initiator.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.batch.includes(searchTerm)
  );

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Ready":
        return "bg-green-100 text-green-800 border-green-200";
      case "In Progress":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Acknowledged":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Pending":
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (view === "details") {
    return (
      <div className="flex flex-col h-full overflow-auto">
        <header className="bg-white p-4 border-b flex items-center">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="mr-2"
              onClick={() => setView("list")}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <span className="text-gray-500 mx-2">/</span>
            <span className="text-gray-500">Card Request</span>
            <span className="text-gray-500 mx-2">/</span>
            <span className="text-gray-500">Request Details</span>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold mb-2">Request Details</h1>
            <p className="text-gray-500">
              Perform predetermined actions on card requests here.
            </p>
          </div>

          {selectedRequest && (
            <div className="bg-white rounded-md border shadow-sm p-6">
              <h2 className="text-lg font-medium mb-6">Card Request Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Branch Name</p>
                  <div className="p-3 bg-gray-50 rounded-md">
                    {selectedRequest.branch}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Initiator</p>
                  <div className="p-3 bg-gray-50 rounded-md">
                    {selectedRequest.initiator}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Card Type</p>
                  <div className="p-3 bg-gray-50 rounded-md">Classic Debit</div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Card Charges</p>
                  <div className="p-3 bg-gray-50 rounded-md">₦1,500</div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Quantity</p>
                  <div className="p-3 bg-gray-50 rounded-md">
                    {selectedRequest.quantity}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Batch</p>
                  <div className="p-3 bg-gray-50 rounded-md">
                    {selectedRequest.batch}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Date Requested</p>
                  <div className="p-3 bg-gray-50 rounded-md">
                    {selectedRequest.dateRequested}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Status</p>
                  <div className="p-3 bg-gray-50 rounded-md">
                    <Badge
                      variant="outline"
                      className={getStatusBadgeClass(selectedRequest.status)}
                    >
                      {selectedRequest.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Actions</h3>
                <div className="flex flex-wrap gap-4">
                  <Button
                    variant="outline"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800"
                    onClick={handleDownloadForProduction}
                  >
                    <FileDown className="h-4 w-4 mr-2" />
                    Download for Production
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-orange-100 hover:bg-orange-200 text-orange-800"
                    onClick={() => handleStatusChange("In Progress")}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Mark as In Progress
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-green-100 hover:bg-green-200 text-green-800"
                    onClick={() => handleStatusChange("Ready")}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark as Ready
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-purple-100 hover:bg-purple-200 text-purple-800"
                    onClick={handleSendToDispatch}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send to Dispatch
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-blue-100 hover:bg-blue-200 text-blue-800"
                    onClick={() => handleStatusChange("Acknowledged")}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Mark as Acknowledged
                  </Button>
                </div>
              </div>
            </div>
          )}
        </main>

        <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
          <DialogContent className="sm:max-w-md">
            <VisuallyHidden>
              <DialogTitle>Success</DialogTitle>
            </VisuallyHidden>
            <div className="flex flex-col justify-start p-6">
              <div className="w-12 h-12 rounded-lg border flex items-center justify-center mb-4">
                <CircleCheck className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Successful</h2>
              <p className="text-gray-600 mb-6">{successMessage}</p>
              <div>
                <Button
                  className="bg-button hover:bg-shadow"
                  onClick={handleCloseSuccessModal}
                >
                  Continue
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <main className="flex-1 overflow-auto p-6">
      <div className="border-b-2 p-3">
        <h1 className="text-2xl font-semibold mb-2">Card Request</h1>
        <p className="text-gray-500">View and attend to card requests here.</p>
      </div>

      <div className="flex justify-between items-center mb-3 border-b-2 p-3">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by branch"
            className="pl-10 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="border-r border-border bg-[#F9FAFB]">
                Branch
              </TableHead>
              <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                Initiator
              </TableHead>
              <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                Quantity
              </TableHead>
              <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                Batch
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
            {filteredRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="border-r border-border">
                  {request.branch}
                </TableCell>
                <TableCell className="border-r border-border text-center">
                  {request.initiator}
                </TableCell>
                <TableCell className="border-r border-border text-center">
                  {request.quantity}
                </TableCell>
                <TableCell className="border-r border-border text-center">
                  {request.batch}
                </TableCell>
                <TableCell className="border-r border-border text-center">
                  {request.dateRequested}
                </TableCell>
                <TableCell className="border-r border-border text-center">
                  <Badge
                    variant="outline"
                    className={getStatusBadgeClass(request.status)}
                  >
                    {request.status}
                  </Badge>
                </TableCell>
                <TableCell className="border-r border-border text-center">
                  <Button
                    variant="link"
                    className="text-blue-600 p-0 h-auto"
                    onClick={() => handleViewRequest(request)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
