"use client";

import { useState } from "react";
import { Search, Plus, Trash2, CreditCard, Pencil } from "lucide-react";
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
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function CardSchemeContent() {
  const [schemes, setSchemes] = useState([
    { id: 1, name: "Verve", panLength: 18 },
    { id: 2, name: "Verve", panLength: 18 },
    { id: 3, name: "Verve", panLength: 18 },
  ]);

  const [newScheme, setNewScheme] = useState({
    name: "",
    panLength: 0,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewScheme((prev) => ({
      ...prev,
      [name]: name === "panLength" ? Number.parseInt(value) || 0 : value,
    }));
  };

  const handleAddScheme = () => {
    const newId =
      schemes.length > 0 ? Math.max(...schemes.map((s) => s.id)) + 1 : 1;

    setSchemes([
      ...schemes,
      {
        id: newId,
        name: newScheme.name,
        panLength: newScheme.panLength,
      },
    ]);

    setNewScheme({
      name: "",
      panLength: 0,
    });

    setIsAddDialogOpen(false);
  };

  const handleDeleteScheme = (id) => {
    setSchemes(schemes.filter((scheme) => scheme.id !== id));
  };

  const filteredSchemes = schemes.filter((scheme) =>
    scheme.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="flex-1 overflow-auto p-6">
      <div className="border-b-2 p-3">
        <h1 className="text-2xl font-semibold mb-2">Card Scheme</h1>
        <p className="text-gray-500">Add, view and edit card schemes here.</p>
      </div>

      <div className="flex justify-between items-center mb-3 border-b-2 p-3">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by scheme name"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-button hover:bg-shadow">
              <Plus className="h-4 w-4 mr-2" />
              Add Scheme
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="flex items-center">
                <div className="border p-3 rounded-lg mr-4">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <DialogTitle>Add Card Scheme</DialogTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    Fill in scheme name and PAN length.
                  </p>
                </div>
              </div>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Scheme Name*</Label>
                <Input
                  id="name"
                  name="name"
                  value={newScheme.name}
                  onChange={handleInputChange}
                  placeholder="Verve"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="panLength">PAN Length</Label>
                <Input
                  id="panLength"
                  name="panLength"
                  type="number"
                  value={newScheme.panLength || ""}
                  onChange={handleInputChange}
                  placeholder="0"
                />
              </div>
            </div>
            <Button
              className="w-full bg-button hover:bg-shadow"
              onClick={handleAddScheme}
            >
              Add Scheme
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="border-r border-border bg-[#F9FAFB]">
                Scheme Name
              </TableHead>
              <TableHead className="border-r border-border bg-[#F9FAFB] text-center">
                PAN Length
              </TableHead>
              <TableHead className="border-r border-border bg-[#F9FAFB] text-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSchemes.map((scheme) => (
              <TableRow key={scheme.id}>
                <TableCell className="border-r border-border">
                  {scheme.name}
                </TableCell>
                <TableCell className="border-r border-border text-center">
                  {scheme.panLength}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2 justify-center">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2
                        className="h-4 w-4"
                        onClick={() => handleDeleteScheme(scheme.id)}
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
