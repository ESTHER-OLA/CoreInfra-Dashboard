"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Lock, Bell, Eye, EyeOff, UserCircle } from "lucide-react";

export default function AccountContent() {
  const [profile, setProfile] = useState({
    firstName: "Root",
    lastName: "User",
    email: "rootuser@mercator.com",
    phone: "09012345678",
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = () => {
    // In a real app, this would send the data to a backend
    alert("Profile updated successfully");
  };

  const handleChangePassword = () => {
    if (password.new !== password.confirm) {
      alert("New passwords do not match");
      return;
    }

    // In a real app, this would send the data to a backend
    alert("Password changed successfully");
    setPassword({
      current: "",
      new: "",
      confirm: "",
    });
  };

  return (
    <main className="flex-1 overflow-auto p-6">
      <div className="mb-2 p-3 border-b-2">
        <h1 className="text-2xl font-semibold mb-2">Account</h1>
        <p className="text-gray-500">Change your password here.</p>
      </div>

      <div className="max-w-2xl mt-2">
        <Tabs defaultValue="password">
          <TabsList className="mb-6">
            <TabsTrigger value="profile" className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="password" className="flex items-center">
              <Lock className="h-4 w-4 mr-2" />
              Password
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your account profile information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={profile.firstName}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={profile.lastName}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={profile.phone}
                    onChange={handleProfileChange}
                  />
                </div>
                <Button
                  className="w-50 bg-button hover:bg-blue-700 mt-4"
                  onClick={handleUpdateProfile}
                >
                  Update Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                {/* <CardDescription>Update your password to keep your account secure.</CardDescription> */}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current">Old Password*</Label>
                  <div className="relative">
                    <Input
                      id="current"
                      name="current"
                      type={showCurrentPassword ? "text" : "password"}
                      value={password.current}
                      onChange={handlePasswordChange}
                      placeholder="Input"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                    >
                      {showCurrentPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new">New Password*</Label>
                  <div className="relative">
                    <Input
                      id="new"
                      name="new"
                      type={showNewPassword ? "text" : "password"}
                      value={password.new}
                      onChange={handlePasswordChange}
                      placeholder="Create password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Password required to be at least 8 characters long
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm">Confirm Password*</Label>
                  <div className="relative">
                    <Input
                      id="confirm"
                      name="confirm"
                      type={showConfirmPassword ? "text" : "password"}
                      value={password.confirm}
                      onChange={handlePasswordChange}
                      placeholder="Confirm password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">Passwords must match</p>
                </div>
                <Button
                  className="w-50 bg-button hover:bg-blue-700 mt-4"
                  onClick={handleChangePassword}
                >
                  Submit
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Manage your notification settings.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Notification settings coming soon.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
