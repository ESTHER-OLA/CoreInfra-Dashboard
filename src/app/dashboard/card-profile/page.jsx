"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  Trash2,
  Pencil,
  ChevronLeft,
  CreditCard,
  ChevronRight,
  SquarePlus,
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function CardProfileContent() {
  const [view, setView] = useState("list");
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: "Verve-1",
      currency: "NGN",
      expiration: "40 months",
      binPrefix: "50611234",
      dateCreated: "11/12/2024 23:21:03",
    },
    {
      id: 2,
      name: "Verve-1",
      currency: "NGN",
      expiration: "40 months",
      binPrefix: "50611234",
      dateCreated: "11/12/2024 23:21:03",
    },
    {
      id: 3,
      name: "Verve-1",
      currency: "NGN",
      expiration: "40 months",
      binPrefix: "50611234",
      dateCreated: "11/12/2024 23:21:03",
    },
  ]);

  const [newProfile, setNewProfile] = useState({
    name: "",
    binPrefix: "",
    scheme: "Verve",
    expiration: "0",
    description: "",
    currency: "NGN",
    branchBlacklist: "Head Office",
  });

  const [fees, setFees] = useState([]);
  const [isAddFeeDialogOpen, setIsAddFeeDialogOpen] = useState(false);
  const [newFee, setNewFee] = useState({
    name: "",
    value: 0,
    currency: "NGN",
    frequency: "One Off",
    impact: "Issuance",
    accountPad: "None",
    account: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setNewProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeeInputChange = (e) => {
    const { name, value } = e.target;
    setNewFee((prev) => ({
      ...prev,
      [name]: name === "value" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleFeeRadioChange = (name, value) => {
    setNewFee((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddFee = () => {
    const newId = fees.length > 0 ? Math.max(...fees.map((f) => f.id)) + 1 : 1;

    setFees([
      ...fees,
      {
        id: newId,
        name: newFee.name,
        value: newFee.value,
        currency: newFee.currency,
        frequency: newFee.frequency,
        impact: newFee.impact,
        accountPad: newFee.accountPad,
        account: newFee.account,
      },
    ]);

    setNewFee({
      name: "",
      value: 0,
      currency: "NGN",
      frequency: "One Off",
      impact: "Issuance",
      accountPad: "None",
      account: "",
    });

    setIsAddFeeDialogOpen(false);
  };

  const handleCreateProfile = () => {
    const newId =
      profiles.length > 0 ? Math.max(...profiles.map((p) => p.id)) + 1 : 1;
    const currentDate = new Date().toLocaleString();

    setProfiles([
      ...profiles,
      {
        id: newId,
        name: newProfile.name,
        currency: newProfile.currency,
        expiration: `${newProfile.expiration} months`,
        binPrefix: newProfile.binPrefix,
        dateCreated: currentDate,
      },
    ]);

    setNewProfile({
      name: "",
      binPrefix: "",
      scheme: "Verve",
      expiration: "0",
      description: "",
      currency: "NGN",
      branchBlacklist: "Head Office",
    });

    setFees([]);
    setView("list");
  };

  const handleDeleteProfile = (id) => {
    setProfiles(profiles.filter((profile) => profile.id !== id));
  };

  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (view === "create") {
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
            <span className="flex text-gray-500 mx-2">
              <CreditCard className="h-4 w-4 text-center mt-1" />
              <ChevronRight className="text-input" />
            </span>
            <span className="text-gray-500">Card Profile</span>
            <span className="text-gray-500 mx-2">
              <ChevronRight className="text-input" />
            </span>
            <span className="text-gray-500 font-bold">Create Profile</span>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold mb-2">Create Profile</h1>
            <p className="text-gray-500">
              Fill in profile details and add card fee.
            </p>
          </div>

          <div className="space-y-6 max-w-4xl">
            <div className="bg-white rounded-md border shadow-sm p-6">
              <h2 className="text-lg font-medium mb-4">Profile Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Card Name*</Label>
                  <Input
                    id="name"
                    name="name"
                    value={newProfile.name}
                    onChange={handleInputChange}
                    placeholder="Enter card name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="binPrefix">Bin Prefix*</Label>
                  <Input
                    id="binPrefix"
                    name="binPrefix"
                    value={newProfile.binPrefix}
                    onChange={handleInputChange}
                    placeholder="00000000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scheme">Card Scheme*</Label>
                  <Select
                    value={newProfile.scheme}
                    onValueChange={(value) =>
                      handleSelectChange("scheme", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Verve" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Verve">Verve</SelectItem>
                      <SelectItem value="Mastercard">Mastercard</SelectItem>
                      <SelectItem value="Visa">Visa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiration">Expiration*</Label>
                  <Select
                    value={newProfile.expiration}
                    onValueChange={(value) =>
                      handleSelectChange("expiration", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="0" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="12">12</SelectItem>
                      <SelectItem value="24">24</SelectItem>
                      <SelectItem value="36">36</SelectItem>
                      <SelectItem value="40">40</SelectItem>
                      <SelectItem value="48">48</SelectItem>
                      <SelectItem value="60">60</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    name="description"
                    value={newProfile.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency*</Label>
                  <Select
                    value={newProfile.currency}
                    onValueChange={(value) =>
                      handleSelectChange("currency", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="NGN" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NGN">NGN</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="branchBlacklist">Branch Blacklist</Label>
                  <Select
                    value={newProfile.branchBlacklist}
                    onValueChange={(value) =>
                      handleSelectChange("branchBlacklist", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Head Office" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Head Office">Head Office</SelectItem>
                      <SelectItem value="Corporate">Corporate</SelectItem>
                      <SelectItem value="Lekki">Lekki</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-md border shadow-sm p-6">
              <div className="flex flex-col items-start mb-4">
                <h2 className="text-lg font-medium mb-5">Fees</h2>
                <Dialog
                  open={isAddFeeDialogOpen}
                  onOpenChange={setIsAddFeeDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="flex bg-button hover:bg-shadow items-center">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Fee
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <div className="flex items-center">
                        <div className="border p-3 rounded-lg mr-4">
                          <SquarePlus className="h-5 w-5" />
                        </div>
                        <div>
                          <DialogTitle>Add Fee</DialogTitle>
                          <p className="text-sm text-gray-500 mt-1">
                            Fill in fee details.
                          </p>
                        </div>
                      </div>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="feeName">Fee Name*</Label>
                        <Input
                          id="feeName"
                          name="name"
                          value={newFee.name}
                          onChange={handleFeeInputChange}
                          placeholder="Maintenance"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="value">Value</Label>
                        <Input
                          id="value"
                          name="value"
                          type="number"
                          value={newFee.value || ""}
                          onChange={handleFeeInputChange}
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Currency</Label>
                        <RadioGroup
                          value={newFee.currency}
                          onValueChange={(value) =>
                            handleFeeRadioChange("currency", value)
                          }
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="NGN"
                              id="ngn"
                              className="h-4 w-4 border-2 border-shadow data-[state=checked]:border-shadow data-[state=checked]:bg-button rounded-full"
                            />
                            <Label htmlFor="ngn">NGN</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="USD"
                              id="usd"
                              className="h-4 w-4 border-2 border-shadow data-[state=checked]:border-shadow data-[state=checked]:bg-button rounded-full"
                            />
                            <Label htmlFor="usd">USD</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="space-y-2">
                        <Label>Fee Frequency</Label>
                        <RadioGroup
                          value={newFee.frequency}
                          onValueChange={(value) =>
                            handleFeeRadioChange("frequency", value)
                          }
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="One Off"
                              id="oneOff"
                              className="h-4 w-4 border-2 border-shadow data-[state=checked]:border-shadow data-[state=checked]:bg-button rounded-full"
                            />
                            <Label htmlFor="oneOff">One Off</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="Monthly"
                              id="monthly"
                              className="h-4 w-4 border-2 border-shadow data-[state=checked]:border-shadow data-[state=checked]:bg-button rounded-full"
                            />
                            <Label htmlFor="monthly">Monthly</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="space-y-2">
                        <Label>Fee Impact</Label>
                        <RadioGroup
                          value={newFee.impact}
                          onValueChange={(value) =>
                            handleFeeRadioChange("impact", value)
                          }
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="Issuance"
                              id="issuance"
                              className="h-4 w-4 border-2 border-shadow data-[state=checked]:border-shadow data-[state=checked]:bg-button rounded-full"
                            />
                            <Label htmlFor="issuance">Issuance</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="Pin Reissue"
                              id="pinReissue"
                              className="h-4 w-4 border-2 border-shadow data-[state=checked]:border-shadow data-[state=checked]:bg-button rounded-full"
                            />
                            <Label htmlFor="pinReissue">Pin Reissue</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="space-y-2">
                        <Label>Account Pad</Label>
                        <RadioGroup
                          value={newFee.accountPad}
                          onValueChange={(value) =>
                            handleFeeRadioChange("accountPad", value)
                          }
                          className="flex flex-row space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="None"
                              id="none"
                              className="h-4 w-4 border-2 border-blue data-[state=checked]:border-shadow data-[state=checked]:bg-button rounded-full"
                            />
                            <Label htmlFor="none">None</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="Branch Code Prefix"
                              id="branchCodePrefix"
                              className="h-4 w-4 border-2 border-shadow data-[state=checked]:border-shadow data-[state=checked]:bg-button rounded-full"
                            />
                            <Label htmlFor="branchCodePrefix">
                              Branch Code Prefix
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="Branch Code Suffix"
                              id="branchCodeSuffix"
                              className="h-4 w-4 border-2 border-shadow data-[state=checked]:border-shadow data-[state=checked]:bg-button rounded-full"
                            />
                            <Label htmlFor="branchCodeSuffix">
                              Branch Code Suffix
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="account">Account</Label>
                        <Input
                          id="account"
                          name="account"
                          value={newFee.account}
                          onChange={handleFeeInputChange}
                        />
                      </div>
                    </div>
                    <Button
                      className="w-full bg-button hover:bg-blue-700"
                      onClick={handleAddFee}
                    >
                      Add Fee
                    </Button>
                  </DialogContent>
                </Dialog>
              </div>

              <Table className="border">
                <TableHeader>
                  <TableRow>
                    <TableHead className="border-r bg-[#F9FAFB]">
                      Name
                    </TableHead>
                    <TableHead className="border-r bg-[#F9FAFB] text-center">
                      Value
                    </TableHead>
                    <TableHead className="border-r bg-[#F9FAFB] text-center">
                      Frequency
                    </TableHead>
                    <TableHead className="border-r bg-[#F9FAFB] text-center">
                      Currency
                    </TableHead>
                    <TableHead className="border-r bg-[#F9FAFB] text-center">
                      Time
                    </TableHead>
                    <TableHead className="border-r bg-[#F9FAFB] text-center">
                      Account Pad
                    </TableHead>
                    <TableHead className="border-r bg-[#F9FAFB] text-center">
                      Account
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fees.length === 0 ? (
                    <TableRow>
                      {[...Array(7)].map((_, i) => (
                        <TableCell key={i} className="border-r py-4" />
                      ))}
                    </TableRow>
                  ) : (
                    fees.map((fee) => (
                      <TableRow key={fee.id}>
                        <TableCell className="border-r">{fee.name}</TableCell>
                        <TableCell className="border-r text-center">
                          {fee.value}
                        </TableCell>
                        <TableCell className="border-r text-center">
                          {fee.frequency}
                        </TableCell>
                        <TableCell className="border-r text-center">
                          {fee.currency}
                        </TableCell>
                        <TableCell className="border-r text-center">
                          {fee.impact}
                        </TableCell>
                        <TableCell className="border-r text-center">
                          {fee.accountPad}
                        </TableCell>
                        <TableCell className="border-r text-center">
                          {fee.account || "-"}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <Button
              className="bg-button hover:bg-blue-700 w-50"
              onClick={handleCreateProfile}
            >
              Create Profile
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <main className="flex-1 overflow-auto p-6">
      <div className="border-b-2 p-3">
        <h1 className="text-2xl font-semibold mb-2">Card Profile</h1>
        <p className="text-gray-500">
          Create, view and edit card profiles here.
        </p>
      </div>

      <div className="flex justify-between items-center mb-3 border-b-2 p-3">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by card name"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Button
          className="bg-button hover:bg-blue-700"
          onClick={() => setView("create")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Profile
        </Button>
      </div>

      <div className="bg-white rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="border-r border-border bg-[#F9FAFB]">
                Card Name
              </TableHead>
              <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                Currency
              </TableHead>
              <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                Expiration
              </TableHead>
              <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                Bin Prefix
              </TableHead>
              <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                Date Created
              </TableHead>
              <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProfiles.map((profile) => (
              <TableRow key={profile.id}>
                <TableCell className="border-r border-border bg-[#F9FAFB]">
                  {profile.name}
                </TableCell>
                <TableCell className="border-r border-border text-center bg-[#F9FAFB]">
                  {profile.currency}
                </TableCell>
                <TableCell className="border-r border-border text-center bg-[#F9FAFB]">
                  {profile.expiration}
                </TableCell>
                <TableCell className="border-r border-border text-center bg-[#F9FAFB]">
                  {profile.binPrefix}
                </TableCell>
                <TableCell className="border-r border-border text-center bg-[#F9FAFB]">
                  {profile.dateCreated}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2 justify-center">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2
                        className="h-4 w-4"
                        onClick={() => handleDeleteProfile(profile.id)}
                      />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
