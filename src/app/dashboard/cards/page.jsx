"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  CreditCard,
  ArrowLeft,
  ArrowRight,
  X,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

export default function CardsContent() {
  const [cards, setCards] = useState(
    Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      cardholder: "Nazeer Ajibola",
      accountNumber: "1234567890",
      maskedPan: "500612*******6382",
      dateIssued: "11/14/2024 10:27:43",
      dateRequested: "11/11/2024 09:23:37",
      expiry: "32 months",
      batch: "847264905",
      status:
        i % 4 === 0
          ? "Blocked"
          : i % 3 === 0
          ? "Pin Reissue"
          : i % 2 === 0
          ? "Instant"
          : "Personalized",
    }))
  );

  const [activeTab, setActiveTab] = useState("Personalized");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isIssueCardDialogOpen, setIsIssueCardDialogOpen] = useState(false);
  const [newCard, setNewCard] = useState({
    cardholder: "",
    accountNumber: "",
    cardType: "",
    branch: "",
  });
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState({
    category: "",
    accountNumber: "",
    customerName: "",
  });
  const [selectedDate, setSelectedDate] = useState(null);

  const handleFilterInputChange = (e) => {
    const { name, value } = e.target;
    setFilterCriteria((prev) => ({ ...prev, [name]: value }));
  };
  const handleFilterSelectChange = (name, value) => {
    setFilterCriteria((prev) => ({ ...prev, [name]: value }));
  };
  const handleApplyFilter = () => {
    // Placeholder for applying filters, just closes the dialog here
    setIsFilterDialogOpen(false);
  };

  const itemsPerPage = 15;
  const totalPages = Math.ceil(cards.length / itemsPerPage);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCard((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setNewCard((prev) => ({ ...prev, [name]: value }));
  };

  const handleIssueCard = () => {
    setIsIssueCardDialogOpen(false);
    setNewCard({
      cardholder: "",
      accountNumber: "",
      cardType: "",
      branch: "",
    });
  };

  const filteredCards = cards.filter((card) => {
    return (
      (card.status === activeTab &&
        (card.cardholder.toLowerCase().includes(searchTerm.toLowerCase()) ||
          card.accountNumber.includes(searchTerm) ||
          card.maskedPan.includes(searchTerm) ||
          card.batch.includes(searchTerm))) ||
      searchTerm === ""
    );
  });

  const paginatedCards = filteredCards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className="flex-1 overflow-auto p-6">
      <div className="border-b-2 p-3 mb-3">
        <h1 className="text-2xl font-semibold mb-2">Cards</h1>
        <p className="text-gray-500">View all cards status here.</p>
      </div>
      <Tabs
        defaultValue="Personalized"
        value={activeTab}
        onValueChange={(value) => {
          if (
            value === "Personalized" ||
            value === "Instant" ||
            value === "Blocked" ||
            value === "Pin Reissue"
          ) {
            setActiveTab(value);
          }
        }}
        className="mb-6"
      >
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            {["Personalized", "Instant", "Blocked", "Pin Reissue"].map(
              (tab) => (
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
              )
            )}
          </TabsList>

          <Dialog
            open={isIssueCardDialogOpen}
            onOpenChange={setIsIssueCardDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="bg-button hover:bg-blue-700">
                <CreditCard className="h-4 w-4 mr-2" />
                Issue Card
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Issue New Card
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="cardholder">Cardholder Name</Label>
                  <Input
                    id="cardholder"
                    name="cardholder"
                    value={newCard.cardholder}
                    onChange={handleInputChange}
                    placeholder="Enter cardholder name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    name="accountNumber"
                    value={newCard.accountNumber}
                    onChange={handleInputChange}
                    placeholder="Enter account number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardType">Card Type</Label>
                  <Select
                    value={newCard.cardType}
                    onValueChange={(value) =>
                      handleSelectChange("cardType", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select card type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Verve Classic">
                        Verve Classic
                      </SelectItem>
                      <SelectItem value="Verve Prepaid">
                        Verve Prepaid
                      </SelectItem>
                      <SelectItem value="Mastercard Gold">
                        Mastercard Gold
                      </SelectItem>
                      <SelectItem value="Visa Platinum">
                        Visa Platinum
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="branch">Branch</Label>
                  <Select
                    value={newCard.branch}
                    onValueChange={(value) =>
                      handleSelectChange("branch", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Head Office">Head Office</SelectItem>
                      <SelectItem value="Corporate">Corporate</SelectItem>
                      <SelectItem value="Lekki">Lekki</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setIsIssueCardDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-button hover:bg-shadow"
                  onClick={handleIssueCard}
                >
                  Issue Card
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex justify-between items-center border p-1 bg-table">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search card"
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
                        <SelectItem value="Personalized Card">
                          Personalized Card
                        </SelectItem>
                        <SelectItem value=" Instant Card">
                          Instant Card
                        </SelectItem>
                        <SelectItem value="Block Card">Block Card</SelectItem>
                        <SelectItem value="PIN Reissue">PIN Reissue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="filterCardHolder">Card Holder</Label>
                    <Input
                      id="filterCardHolde"
                      name="CardHolder"
                      value={filterCriteria.cardholder}
                      onChange={handleFilterInputChange}
                      placeholder="Enter Card Holder Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="filterBatchNumber">Batch Number</Label>
                    <Input
                      id="filterBatchNumber"
                      name="customerName"
                      value={filterCriteria.customerName}
                      onChange={handleFilterInputChange}
                      placeholder="Enter Batch number"
                    />
                  </div>
                </div>
                <Button
                  className="w-full bg-button hover:bg-shadow"
                  onClick={handleApplyFilter}
                >
                  Apply
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <TabsContent value="Personalized">
          <div className="bg-white rounded-md border shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="border-r border-border bg-[#F9FAFB]">
                    Cardholder
                  </TableHead>
                  <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCards
                  .filter((card) => card.status === "Personalized")
                  .map((card) => (
                    <TableRow key={card.id}>
                      <TableCell className="border-r border-border">
                        {card.cardholder}
                      </TableCell>
                      <TableCell className="border-r border-border text-center">
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
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="Instant">
          <div className="bg-white rounded-md border shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="border-r border-border bg-[#F9FAFB]">
                    Initiator
                  </TableHead>
                  <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                    Account Number
                  </TableHead>
                  <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                    Masked PAN
                  </TableHead>
                  <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                    Date Requested
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCards
                  .filter((card) => card.status === "Instant")
                  .map((card) => (
                    <TableRow key={card.id}>
                      <TableCell className="border-r">
                        {card.cardholder}
                      </TableCell>
                      <TableCell className="border-r text-center">
                        {card.accountNumber}
                      </TableCell>
                      <TableCell className="border-r text-center">
                        {card.maskedPan}
                      </TableCell>
                      <TableCell className="border-r text-center">
                        {card.dateRequested}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="Blocked">
          <div className="bg-white rounded-md border shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="border-r border-border bg-[#F9FAFB]">
                    Initiator
                  </TableHead>
                  <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                    Account Number
                  </TableHead>
                  <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                    Masked PAN
                  </TableHead>
                  <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                    Date Requested
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCards
                  .filter((card) => card.status === "Blocked")
                  .map((card) => (
                    <TableRow key={card.id}>
                      <TableCell className="border-r ">
                        {card.cardholder}
                      </TableCell>
                      <TableCell className="border-r border-border text-center">
                        {card.accountNumber}
                      </TableCell>
                      <TableCell className="border-r border-border text-center">
                        {card.maskedPan}
                      </TableCell>
                      <TableCell className="border-r border-border text-center">
                        {card.dateRequested}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="Pin Reissue">
          <div className="bg-white rounded-md border shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="border-r bg-[#F9FAFB]">
                    Initiator
                  </TableHead>
                  <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                    Account Number
                  </TableHead>
                  <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                    Masked PAN
                  </TableHead>
                  <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                    Date Requested
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCards
                  .filter((card) => card.status === "Pin Reissue")
                  .map((card) => (
                    <TableRow key={card.id}>
                      <TableCell className="border-r">
                        {card.cardholder}
                      </TableCell>
                      <TableCell className="border-r border-border text-center">
                        {card.accountNumber}
                      </TableCell>
                      <TableCell className="border-r border-border text-center">
                        {card.maskedPan}
                      </TableCell>
                      <TableCell className="border-r border-border text-center">
                        {card.dateRequested}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

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
    </main>
  );
}
