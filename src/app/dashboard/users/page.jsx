"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  Trash2,
  UserRoundPlus,
  Users,
  Pencil,
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
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UsersContent() {
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "RootUser",
      phone: "09012345678",
      email: "rootuser@mercator.com",
      dateCreated: "11/07/2024 08:41:37",
    },
    {
      id: 2,
      username: "RootUser",
      phone: "09012345678",
      email: "rootuser@mercator.com",
      dateCreated: "11/07/2024 08:41:37",
    },
    {
      id: 3,
      username: "RootUser",
      phone: "09012345678",
      email: "rootuser@mercator.com",
      dateCreated: "11/07/2024 08:41:37",
    },
  ]);

  const [newUser, setNewUser] = useState({
    username: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    accessLevel: "",
    branch: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value) => {
    setNewUser((prev) => ({ ...prev, role: value }));
  };

  const handleAddUser = () => {
    if (newUser.password !== newUser.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const newId =
      users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
    const currentDate = new Date().toLocaleString();

    setUsers([
      ...users,
      {
        id: newId,
        username: newUser.username,
        phone: newUser.phone,
        email: newUser.email,
        dateCreated: currentDate,
      },
    ]);

    setNewUser({
      username: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      accessLevel: "",
      branch: "",
    });

    setIsAddDialogOpen(false);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
  );

  return (
    <main className="flex-1 overflow-auto p-6">
      <div className="border-b-2 p-3">
        <h1 className="text-2xl font-semibold mb-2">Users</h1>
        <p className="text-gray-500">
          Manage your users, create users, view and edit users. Assign roles to
          users here.
        </p>
      </div>

      <div className="flex justify-between items-center border-b-2 p-3 mb-3">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by username"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-button hover:bg-shadow">
              <Plus className="h-4 w-4 mr-2" />
              Create User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center">
                <div className="border p-3 rounded-lg mr-4">
                  <UserRoundPlus className="h-5 w-5" />
                </div>
                <div>
                  <DialogTitle>Create User</DialogTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    Fill in user details and assign role.
                  </p>
                </div>
              </div>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username*</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="User"
                  value={newUser.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="firstName">First name*</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="Nazeer"
                  value={newUser.firstName || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name*</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Ajibola"
                  value={newUser.lastName || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email address*</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Ajibola@gmail.com"
                  value={newUser.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone*</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="09012345678"
                  value={newUser.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password*</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="********"
                  value={newUser.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accessLevel">Access Level</Label>
                <Select
                  value={newUser.accessLevel || ""}
                  onValueChange={(value) =>
                    setNewUser({ ...newUser, accessLevel: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select level from dropdown" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="branch">Branch</Label>
                <Select
                  value={newUser.branch || ""}
                  onValueChange={(value) =>
                    setNewUser({ ...newUser, branch: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select branch from dropdown" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="head-office">Head Office</SelectItem>
                    <SelectItem value="corporate">Corporate</SelectItem>
                    <SelectItem value="lekki">Lekki</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Assign Role</Label>
                <Select value={newUser.role} onValueChange={handleRoleChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select role from dropdown" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              className="w-full bg-button hover:bg-shadow"
              onClick={handleAddUser}
            >
              Create user
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="border-r border-border bg-[#F9FAFB]">
                Username
              </TableHead>
              <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                Phone
              </TableHead>
              <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                Email
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
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="border-r border-border">
                  {user.username}
                </TableCell>
                <TableCell className="border-r border-border text-center">
                  {user.phone}
                </TableCell>
                <TableCell className="border-r border-border text-center">
                  {user.email}
                </TableCell>
                <TableCell className="border-r border-border text-center">
                  {user.dateCreated}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center space-x-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2
                        className="h-4 w-4"
                        onClick={() => handleDeleteUser(user.id)}
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
