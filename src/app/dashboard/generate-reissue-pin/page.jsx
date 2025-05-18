"use client";

import React, { useState } from "react";
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
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  MessageSquare,
  Mail,
  X,
  KeyRound,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function GenerateReissuePinContent() {
  const [accountNumber, setAccountNumber] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPinActionModal, setShowPinActionModal] = useState(false);
  const [showPinDeliveryModal, setShowPinDeliveryModal] = useState(false);
  const [showPinDisplayModal, setShowPinDisplayModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showSmsModal, setShowSmsModal] = useState(false);
  const [currentAction, setCurrentAction] = useState("generate");
  const [currentCardId, setCurrentCardId] = useState(null);
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [generatedPin, setGeneratedPin] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const itemsPerPage = 10;
  const totalPages = Math.ceil(cards.length / itemsPerPage);
  const paginatedCards = cards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (e) => {
    e.preventDefault();

    if (!accountNumber) return;

    // Mock data for demo purposes
    const mockCards = Array.from({ length: 3 }, (_, i) => ({
      id: i + 1,
      maskedPan: "500612*******6382",
      dateIssued: "11/14/2024 10:27:43",
      expiry: "32 months",
      batch: "847264905",
    }));

    setCards(mockCards);
    setSearchPerformed(true);
  };

  const handlePinAction = (cardId, action) => {
    setCurrentCardId(cardId);
    setCurrentAction(action);
    setShowPinDeliveryModal(true);
  };

  const handlePinDeliveryMethod = (method) => {
    setShowPinDeliveryModal(false);

    if (method === "show") {
      const pin = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedPin(pin);
      setShowPinDisplayModal(true);
    } else if (method === "email") {
      setShowEmailModal(true);
    } else if (method === "sms") {
      setShowSmsModal(true);
    }
  };

  const handleSendEmail = () => {
    // Send email logic here
    setShowEmailModal(false);
    setSuccessMessage(`PIN has been sent to ${emailAddress} successfully.`);
    setShowSuccessModal(true);
  };

  const handleSendSms = () => {
    // Send SMS logic here
    setShowSmsModal(false);
    setSuccessMessage(`PIN has been sent to ${phoneNumber} successfully.`);
    setShowSuccessModal(true);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
      <main className="flex-1 overflow-auto p-6">
        <div className="border-b p-3 mb-6">
          <h1 className="text-2xl font-semibold mb-2">Generate/Reissue Pin</h1>
          <p className="text-gray-500">Generate and Reissue Card Pins here.</p>
        </div>

        <form onSubmit={handleSearch} className="mb-8">
          <div className="space-y-4 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number*</Label>
              <Input
                id="accountNumber"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="Enter account number"
                required
              />
            </div>
            <Button type="submit" className="bg-button hover:bg-blue-700">
              Search
            </Button>
          </div>
        </form>

        {searchPerformed && (
          <>
            <h2 className="text-lg font-medium mb-4">Available Cards</h2>
            <div className="bg-white rounded-md border shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="border-r border-border bg-[#F9FAFB]">
                      Masked PAN
                    </TableHead>
                    <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                      Date Issued
                    </TableHead>
                    <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                      Expiry
                    </TableHead>
                    <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                      Batch
                    </TableHead>
                    <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedCards.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-8 text-gray-500 border-r"
                      >
                        No cards found for this account.
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedCards.map((card) => (
                      <TableRow key={card.id}>
                        <TableCell className="border-r border-border">
                          {card.maskedPan}
                        </TableCell>
                        <TableCell className="border-r border-border text-center">
                          {card.dateIssued}
                        </TableCell>
                        <TableCell className="border-r border-border text-center">
                          {card.expiry}
                        </TableCell>
                        <TableCell className="border-r border-border text-center">
                          {card.batch}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="link"
                              className="text-button p-0 h-auto"
                              onClick={() =>
                                handlePinAction(card.id, "generate")
                              }
                            >
                              Generate Pin
                            </Button>
                            <Button
                              variant="link"
                              className="text-button p-0 h-auto"
                              onClick={() =>
                                handlePinAction(card.id, "reissue")
                              }
                            >
                              Reissue Pin
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {cards.length > itemsPerPage && (
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-500">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
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
          </>
        )}
      </main>

      {/* PIN Delivery Method Selection Modal */}
      <Dialog
        open={showPinDeliveryModal}
        onOpenChange={setShowPinDeliveryModal}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center">
              <div className="bg-gray-100 p-3 rounded-lg mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div>
                <DialogTitle>
                  {currentAction === "generate"
                    ? "Generate Pin"
                    : "Reissue Pin"}
                </DialogTitle>
                <p className="text-sm text-gray-500 mt-1">Select an option.</p>
              </div>
              <button
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                onClick={() => setShowPinDeliveryModal(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </button>
            </div>
          </DialogHeader>
          <div className="flex justify-center space-x-4 py-4">
            <Button
              variant="outline"
              className="flex items-center"
              onClick={() => handlePinDeliveryMethod("show")}
            >
              <Eye className="h-4 w-4 mr-2" />
              Show PIN
            </Button>
            <Button
              variant="outline"
              className="flex items-center"
              onClick={() => handlePinDeliveryMethod("sms")}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Send SMS
            </Button>
            <Button
              variant="outline"
              className="flex items-center"
              onClick={() => handlePinDeliveryMethod("email")}
            >
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* PIN Display Modal */}
      <Dialog open={showPinDisplayModal} onOpenChange={setShowPinDisplayModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="border-b p-3">
            <div className="flex items-center">
              <div className="bg-gray-100 p-3 rounded-lg mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div>
                <DialogTitle>
                  {currentAction === "generate"
                    ? "Generate Pin"
                    : "Reissue Pin"}
                </DialogTitle>
                <p className="text-sm text-gray-500 mt-1">Show PIN</p>
              </div>
              <button
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                onClick={() => setShowPinDisplayModal(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </button>
            </div>
          </DialogHeader>
          <div className="py-6">
            <h3 className="text-center mb-4">Generated PIN</h3>
            <div className="flex justify-center space-x-2">
              {generatedPin.split("").map((digit, index) => (
                <div
                  key={index}
                  className="w-12 h-12 border border-gray-300 rounded-md flex items-center justify-center text-xl font-semibold"
                >
                  {digit}
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Email Modal */}
      <Dialog open={showEmailModal} onOpenChange={setShowEmailModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="border-b p-3">
            <div className="flex items-center">
              <div className="bg-gray-100 p-3 rounded-lg mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <DialogTitle>
                  {currentAction === "generate"
                    ? "Generate Pin"
                    : "Reissue Pin"}
                </DialogTitle>
                <p className="text-sm text-gray-500 mt-1">Send Email.</p>
              </div>
              <button
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                onClick={() => setShowEmailModal(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </button>
            </div>
          </DialogHeader>
          <div className="space-y-4 py-4 border-b p-3">
            <div className="space-y-2">
              <Label htmlFor="emailAddress">Email Address</Label>
              <Input
                id="emailAddress"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                placeholder="Enter email address"
                type="email"
                required
              />
            </div>
          </div>
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={handleSendEmail}
          >
            Send Email
          </Button>
        </DialogContent>
      </Dialog>

      {/* SMS Modal */}
      <Dialog open={showSmsModal} onOpenChange={setShowSmsModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="border-b p-3">
            <div className="flex items-center">
              <div className="bg-gray-100 p-3 rounded-full mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <div>
                <DialogTitle>
                  {currentAction === "generate"
                    ? "Generate Pin"
                    : "Reissue Pin"}
                </DialogTitle>
                <p className="text-sm text-gray-500 mt-1">Send SMS.</p>
              </div>
              <button
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                onClick={() => setShowSmsModal(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </button>
            </div>
          </DialogHeader>
          <div className="space-y-4 py-4 border-b p-3">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
                type="tel"
                required
              />
            </div>
          </div>
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={handleSendSms}
          >
            Send SMS
          </Button>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center p-6">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <DialogTitle className="text-xl font-semibold mb-2">
              Successful
            </DialogTitle>
            <p className="text-gray-600 mb-6">{successMessage}</p>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleCloseSuccessModal}
            >
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
