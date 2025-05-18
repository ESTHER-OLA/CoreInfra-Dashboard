"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  Upload,
  Trash2,
  X,
  Pencil,
  RefreshCw,
  Building2,
  MapPinPlusInside,
  CloudUpload,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function BranchesContent() {
  const [branches, setBranches] = useState([
    {
      id: 1,
      name: "Head Office",
      code: "202",
      address: "Lekki",
      zone: "Lagos",
      dateAdded: "10/18/2024 14:39:58",
    },
    {
      id: 2,
      name: "Head Office",
      code: "202",
      address: "Lekki",
      zone: "Lagos",
      dateAdded: "10/18/2024 14:39:58",
    },
    {
      id: 3,
      name: "Head Office",
      code: "202",
      address: "Lekki",
      zone: "Lagos",
      dateAdded: "10/18/2024 14:39:58",
    },
  ]);

  const [newBranch, setNewBranch] = useState({
    name: "",
    code: "",
    address: "",
    zone: "",
    area: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBranch((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddBranch = () => {
    const newId =
      branches.length > 0 ? Math.max(...branches.map((b) => b.id)) + 1 : 1;
    const currentDate = new Date().toLocaleString();

    setBranches([
      ...branches,
      {
        id: newId,
        name: newBranch.name,
        code: newBranch.code,
        address: newBranch.address,
        zone: newBranch.zone,
        dateAdded: currentDate,
      },
    ]);

    setNewBranch({
      name: "",
      code: "",
      address: "",
      zone: "",
      area: "",
    });

    setIsAddDialogOpen(false);
  };

  const handleDeleteBranch = (id) => {
    setBranches(branches.filter((branch) => branch.id !== id));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);

      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 300);
    }
  };

  const handleDeleteUploadedFile = () => {
    setUploadedFile(null);
    setUploadProgress(0);
  };

  const filteredBranches = branches.filter(
    (branch) =>
      branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.zone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="flex-1 overflow-auto p-6">
      <div className="flex justify-between items-center border-b-2 p-2">
        <div className="">
          <h1 className="text-2xl font-semibold mb-2">Branches</h1>
          <span className="text-gray-500">
            Add branches, view branches and edit branches.
          </span>
        </div>

        <Button variant="outline" className="flex items-center">
          <RefreshCw className="h-4 w-4 mr-2" />
          Upload File
        </Button>
      </div>

      <div className="flex justify-between items-center p-3 border-b-2">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search branch"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex space-x-4">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Branch
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="flex flex-row items-center">
                <div className="border border-border p-3 rounded-lg mr-4">
                  <MapPinPlusInside className="h-5 w-5" />
                </div>
                <div>
                  <DialogTitle>Add Branch</DialogTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    Fill in branch details.
                  </p>
                </div>
                <DialogClose className="absolute right-4 top-4">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </DialogClose>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name*</Label>
                  <Input
                    id="name"
                    name="name"
                    value={newBranch.name}
                    onChange={handleInputChange}
                    placeholder="Head Office"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Code*</Label>
                  <Input
                    id="code"
                    name="code"
                    value={newBranch.code}
                    onChange={handleInputChange}
                    placeholder="000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address*</Label>
                  <Input
                    id="address"
                    name="address"
                    value={newBranch.address}
                    onChange={handleInputChange}
                    placeholder="Lekki"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zone">Zone*</Label>
                  <Input
                    id="zone"
                    name="zone"
                    value={newBranch.zone}
                    onChange={handleInputChange}
                    placeholder="LG"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="area">Area*</Label>
                  <Input
                    id="area"
                    name="area"
                    value={newBranch.area}
                    onChange={handleInputChange}
                    placeholder="SW"
                  />
                </div>
              </div>
              <div>
                <Button
                  className="bg-button hover:bg-blue-700"
                  onClick={handleAddBranch}
                >
                  Add Branch
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog
            open={isUploadDialogOpen}
            onOpenChange={setIsUploadDialogOpen}
          >
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <RefreshCw className="h-4 w-4 mr-2" />
                Upload From Core
              </Button>
            </DialogTrigger>
            <DialogContent>
              <div className="flex gap-5">
                <CloudUpload className="h-8 w-8 mr-2" />

                <div>
                  <DialogHeader>
                    <DialogTitle className="flex items-center">
                      Upload CSV File
                    </DialogTitle>
                  </DialogHeader>
                  <p className="text-sm text-gray-500 mb-4">
                    CSV file should contain the following columns
                  </p>
                  <ul className="list-disc pl-5 mb-6 text-sm space-y-1">
                    <li>Name</li>
                    <li>Code</li>
                    <li>Address</li>
                    <li>Zone</li>
                    <li>Area</li>
                  </ul>
                </div>
              </div>

              <div className="mt-2">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                  <div className="flex flex-col items-center">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <span className="text-blue-600">Click to upload</span>
                      <span className="text-gray-500"> or drag and drop</span>
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        accept=".csv,.xlsx"
                        disabled={uploadProgress > 0 && uploadProgress < 100}
                        onChange={handleFileUpload}
                      />
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      CSV, XSLX (max. 10mb)
                    </p>
                  </div>
                </div>

                {uploadedFile && (
                  <div className="border rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded mr-2">
                          CSV
                        </div>
                        <span className="text-sm">{uploadedFile.name}</span>
                      </div>
                      <button
                        className="text-gray-500"
                        onClick={handleDeleteUploadedFile}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <div className="text-right text-xs text-gray-500 mt-1">
                      {uploadProgress}%
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-4 mt-6">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button className="bg-button hover:bg-shadow" type="button">
                    Submit
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="bg-white rounded-md border shadow-sm mt-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="border-r border-border bg-[#F9FAFB]">
                Name
              </TableHead>
              <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                Code
              </TableHead>
              <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                Address
              </TableHead>
              <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                Zone
              </TableHead>
              <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                Date Added
              </TableHead>
              <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBranches.map((branch) => (
              <TableRow key={branch.id}>
                <TableCell className="border-r border-border">
                  {branch.name}
                </TableCell>
                <TableCell className="border-r border-border text-center">
                  {branch.code}
                </TableCell>
                <TableCell className="border-r border-border text-center">
                  {branch.address}
                </TableCell>
                <TableCell className="border-r border-border text-center">
                  {branch.zone}
                </TableCell>
                <TableCell className="border-r border-border text-center">
                  {branch.dateAdded}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2 justify-center">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2
                        className="h-4 w-4"
                        onClick={() => handleDeleteBranch(branch.id)}
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
