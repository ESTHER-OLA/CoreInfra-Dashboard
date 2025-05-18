"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { CiUser, CiLock } from "react-icons/ci";

export function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="flex min-h-screen w-full bg-[url('/image.png')] bg-cover bg-center">
      <div className="flex w-full lg:w-1/2 flex-col gap-[9rem] px-18 py-12">
        <div className="">
          <Image
            src="/Lapo_Logo.png"
            alt="LAPO"
            width={120}
            height={50}
            className="h-auto"
          />
        </div>
        <div className="w-full max-w-md space-y-8 items-start justify-center ">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Hi, Welcome Back!</h1>
            <p className="text-muted-foreground">
              Please sign in using your credentials.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 relative">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="h-12 pl-10"
              />
              <CiUser className="absolute top-9 left-3 h-5 w-5" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Forgot password
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 pr-10 pl-10"
                />
                <CiLock className="absolute top-4 left-3 h-5 w-5" />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(!!checked)}
              />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>
            <Button
              type="submit"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700"
            >
              Login
            </Button>
          </form>
        </div>
        <div className="mt-8 text-start text-sm text-gray-500">
          © 2024 Mercator Technologies Ltd. All rights reserved.
        </div>
      </div>
      <div className="px-6 py-6 hidden lg:block">
        <Image
          src="/Login Card.png"
          alt="Dashboard Preview"
          width={500}
          height={300}
          className="rounded-lg shadow-lg w-full"
        />
      </div>
    </div>
  );
}
