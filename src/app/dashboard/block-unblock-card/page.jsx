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
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function BlockUnblockCardContent() {
  const [accountNumber, setAccountNumber] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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

    const mockCards = Array.from({ length: 3 }, (_, i) => ({
      id: i + 1,
      maskedPan: "500612*******6382",
      dateIssued: "11/14/2024 10:27:43",
      expiry: "32 months",
      batch: "847264905",
      isBlocked: i === 2,
    }));

    setCards(mockCards);
    setSearchPerformed(true);
  };

  const handleToggleBlock = (id, newBlockedState) => {
    setCards(
      cards.map((card) =>
        card.id === id ? { ...card, isBlocked: newBlockedState } : card
      )
    );
    setSuccessMessage(
      `Card has been successfully ${newBlockedState ? "blocked" : "unblocked"}.`
    );
    setShowSuccessModal(true);
  };

  return (
    <>
      <main className="flex-1 overflow-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-2">Block/Unblock Card</h1>
          <p className="text-gray-500">
            Attend to card block and unblock requests here.
          </p>
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
            <Button type="submit" className="bg-button hover:bg-shadow">
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
                    <TableHead>Masked PAN</TableHead>
                    <TableHead>Date Issued</TableHead>
                    <TableHead>Expiry</TableHead>
                    <TableHead>Batch</TableHead>
                    <TableHead>Block Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedCards.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-8 text-gray-500"
                      >
                        No cards found for this account.
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedCards.map((card) => (
                      <TableRow key={card.id}>
                        <TableCell>{card.maskedPan}</TableCell>
                        <TableCell>{card.dateIssued}</TableCell>
                        <TableCell>{card.expiry}</TableCell>
                        <TableCell>{card.batch}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Switch
                              checked={!card.isBlocked}
                              onCheckedChange={(checked) =>
                                handleToggleBlock(card.id, !checked)
                              }
                              className="data-[state=checked]:bg-button"
                            />
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
              className="bg-button hover:bg-shadow"
              onClick={() => setShowSuccessModal(false)}
            >
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
