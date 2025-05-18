"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  ChevronLeft,
  Trash2,
  Users,
  Pencil,
  ChevronRight,
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function RolesContent() {
  const [view, setView] = useState("list"); // initial view is "list"
  const [roles, setRoles] = useState([
    { id: 1, name: "Admin", dateCreated: "11/07/2024 19:55:57" },
    { id: 2, name: "Admin", dateCreated: "11/07/2024 19:55:57" },
    { id: 3, name: "Admin", dateCreated: "11/07/2024 19:55:57" },
    { id: 4, name: "Admin", dateCreated: "11/07/2024 19:55:57" },
    { id: 5, name: "Admin", dateCreated: "11/07/2024 19:55:57" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [newRoleName, setNewRoleName] = useState("");

  const menuItems = [
    "Branch",
    "User",
    "Role",
    "Cards",
    "Card Request",
    "Authorization List",
    "Authorization Queue",
    "Activity",
  ];

  const permissions = ["Full", "Create", "Edit", "View", "Delete"];

  // Initial selectedPermissions is an empty object
  const [selectedPermissions, setSelectedPermissions] = useState({});

  const handlePermissionChange = (menu, permission, checked) => {
    setSelectedPermissions((prev) => {
      const current = prev[menu] || [];
      if (checked) {
        return { ...prev, [menu]: [...current, permission] };
      } else {
        return { ...prev, [menu]: current.filter((p) => p !== permission) };
      }
    });
  };

  const handleAddRole = () => {
    if (newRoleName) {
      const newId =
        roles.length > 0 ? Math.max(...roles.map((r) => r.id)) + 1 : 1;
      const currentDate = new Date().toLocaleString();

      setRoles([
        ...roles,
        {
          id: newId,
          name: newRoleName,
          dateCreated: currentDate,
        },
      ]);

      setNewRoleName("");
      setSelectedPermissions({});
      setView("list");
    }
  };

  const handleDeleteRole = (id) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
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
              {" "}
              <Users className="h-4 w-4 text-center mt-1" />
              <ChevronRight className="text-input" />
            </span>
            <span className="text-gray-500">Roles</span>
            <span className="text-gray-500 mx-2">
              <ChevronRight className="text-input" />
            </span>
            <span className="text-gray-500 font-bold">Create Role</span>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold mb-2">Create Role</h1>
            <p className="text-gray-500">
              Set role name, select privileges and permissions.
            </p>
          </div>

          <div className="space-y-6 max-w-4xl">
            <div className="space-y-2">
              <Label htmlFor="role-name">Role name*</Label>
              <Input
                id="role-name"
                value={newRoleName}
                onChange={(e) => setNewRoleName(e.target.value)}
                placeholder="Enter role name"
                className="w-90 bg-white"
              />
            </div>

            <div className="bg-white rounded-md border shadow-sm overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="border-r border-border bg-[#F9FAFB]">
                      Menu Name
                    </TableHead>
                    <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                      Full
                    </TableHead>
                    <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                      Create
                    </TableHead>
                    <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                      Edit
                    </TableHead>
                    <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                      View
                    </TableHead>
                    <TableHead className="border-r border-border text-center bg-[#F9FAFB]">
                      Delete
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {menuItems.map((menu) => (
                    <TableRow key={menu}>
                      <TableCell className="border-r border-border">
                        {menu}
                      </TableCell>
                      {permissions.map((permission) => (
                        <TableCell
                          key={permission}
                          className="border-r border-border text-center"
                        >
                          <Checkbox
                            checked={selectedPermissions[menu]?.includes(
                              permission
                            )}
                            onCheckedChange={(checked) =>
                              handlePermissionChange(
                                menu,
                                permission,
                                !!checked
                              )
                            }
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Button
              className="bg-button hover:bg-shadow"
              onClick={handleAddRole}
            >
              Create Role
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <main className="flex-1 overflow-auto p-6">
      <div className="border-b-2 p-3">
        <h1 className="text-2xl font-semibold mb-2">Roles</h1>
        <p className="text-gray-500">
          Manage your roles, create roles, view roles and edit roles. Select
          privileges and set account permissions here.
        </p>
      </div>

      <div className="flex justify-between items-center mb-3 border-b-2 p-3">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search role"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Button
          className="bg-button hover:bg-shadow"
          onClick={() => setView("create")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Role
        </Button>
      </div>

      <div className="bg-white rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="border-r border-border bg-[#F9FAFB]">
                Name
              </TableHead>
              <TableHead className="border-r border-border bg-[#F9FAFB] text-center">
                Date Created
              </TableHead>
              <TableHead className="border-r border-border bg-[#F9FAFB] text-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRoles.map((role) => (
              <TableRow key={role.id}>
                <TableCell className="border-r border-border">
                  {role.name}
                </TableCell>
                <TableCell className="border-r border-border text-center">
                  {role.dateCreated}
                </TableCell>
                <TableCell className="border-r border-border text-center">
                  <div className="flex space-x-2 justify-center">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2
                        className="h-4 w-4"
                        onClick={() => handleDeleteRole(role.id)}
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
